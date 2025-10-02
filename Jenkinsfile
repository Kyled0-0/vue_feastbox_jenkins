pipeline {
  agent any
  tools { nodejs "NodeJS_18" }

  stages {
    stage('Build') {
      steps {
        sh 'npm ci'
        sh 'npm run build'
        archiveArtifacts artifacts: 'dist/**', fingerprint: true
      }
    }
    stage('Test') {
      steps { sh 'npm run test' }
    }
    stage('Deploy') {
      steps {
        sh 'docker build -t vueapp:latest .'
        sh 'docker run -d -p 8081:80 vueapp:latest'
      }
    }
  }
}
