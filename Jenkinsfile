pipeline {
  agent any

  tools {
    nodejs 'NodeJs'
  }

   environment {
    SONAR_HOST_URL = "https://sonarcloud.io"
  }

  stages {
    stage('Checkout') {
      steps {
        echo "Pulling latest code from GitHub..."
        checkout scm
      }
    }
    stage('Install Dependencies') {
      steps {
          bat 'npm ci'
      }
    }

    stage('Test') {
      steps {
        echo 'Running unit tests with Vitest...'  
        bat 'npm run test:unit'
      }
    }


    stage('SonarCloud Analysis') {
      steps {
        echo "Downloading and running SonarCloud Scanner..."
        withCredentials([string(credentialsId: 'HDSIT223', variable: 'SONAR_TOKEN')]) {
          bat '''
            curl -sSLo sonar-scanner.zip https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-5.0.1.3006-windows.zip
            powershell -Command "Expand-Archive -Force sonar-scanner.zip -DestinationPath ."
            set PATH=%CD%\\sonar-scanner-5.0.1.3006-windows\\bin;%PATH%
                    
            sonar-scanner ^
              -Dsonar.projectKey=Kyled0-0_vue_feastbox_jenkins ^
              -Dsonar.organization=8-2c ^
              -Dsonar.host.url=%SONAR_HOST_URL% ^
              -Dsonar.login=%SONAR_TOKEN%
          '''
        }
      }
    }

    stage('Security Scan - Snyk') {
      steps {
        echo "Running Snyk security scan..."
        withCredentials([string(credentialsId: 'snyk-token', variable: 'SNYK_TOKEN')]) {
          bat 'npm install -g snyk'
          bat 'snyk auth %SNYK_TOKEN%'
          bat 'snyk test --json > snyk-report.json || exit 0'
        }

        echo "Security scan complete. Report saved."
        archiveArtifacts artifacts: 'snyk-report.json', fingerprint: true
      }
    }

    stage('Build') {
      steps {
        bat 'npm run build'
        archiveArtifacts artifacts: 'dist/**', fingerprint: true
        bat 'docker build -t vue-feastbox:latest .'
      }
    }

    stage('Deploy') {
      steps {
        echo "Deploying Docker container to test environment..."
        bat 'docker stop vue-feastbox-container || exit 0'
        bat 'docker rm vue-feastbox-container || exit 0'
        echo "About to run docker run..."
        bat 'docker run -d -p 8081:80 --name vue-feastbox-container vue-feastbox:latest'
        echo "Application deployed to http://localhost:8081"
      }
    }




  }

  post {
    always {
      echo "Pipeline finished."
    }
  }
}
