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

    stage('Code Quality Analysis') {
      steps {
        withSonarQubeEnv('SonarCloud') {    
        bat 'sonar-scanner'                      
        }
      }
    }

    stage('Check Scanner Contents') {
  steps {
    echo"start check scanner contents"
    bat '''
      dir
      if exist sonar-scanner-5.0.1.3006-windows\\bin (
        echo "Scanner folder found"
        dir sonar-scanner-5.0.1.3006-windows\\bin
      ) else (
        echo "Scanner folder NOT found"
      )
    '''
  }
}


    stage('SonarCloud Analysis') {
      steps {
        echo "Downloading and running SonarCloud Scanner..."
        withCredentials([string(credentialsId: 'HDSIT223', variable: 'SONAR_TOKEN')]) {
          bat '''
            curl -sSLo sonar-scanner.zip https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-5.0.1.3006-windows.zip
            powershell -Command "Expand-Archive -Force sonar-scanner.zip -DestinationPath ."

            REM --- run the scanner using its full path ---
            .\\sonar-scanner-5.0.1.3006-windows\\bin\\sonar-scanner ^
              -Dsonar.projectKey=Kyled0-0_vue_feastbox_jenkins ^
              -Dsonar.organization=8-2c ^
              -Dsonar.host.url=%SONAR_HOST_URL% ^
              -Dsonar.login=%SONAR_TOKEN%
          '''
        }
      }
    }

  }

  post {
    always {
      echo "Pipeline finished."
    }
  }
}
