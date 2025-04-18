pipeline {
    agent { label 'mainul' }

    environment{
            // SONARQUBE_SERVER = 'SonarQube'
            // SCANNER_HOME = tool 'SonarQube Scanner'
            DOCKER_IMAGE='maainul/nodejs-docker:latest'
            DOCKER_CREDENTIALS_ID = 'dockerhub'
    }

    stages {

        stage('Clone Repo') {
            steps {
                git url: 'https://github.com/maainul/NodeJs-Docker.git', branch: 'main'
            }
        }

        stage('Build') {
            steps {
                echo "Building the Docker image..."
                sh 'docker build -t $DOCKER_IMAGE .'
                echo "Docker image built successfully!"
            }
        }

        stage('TRIVY FS SCAN') {
            steps {
                sh 'trivy fs . || echo "FS scan completed with vulnerabilities."'
            }
        }

        stage('Push') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: env.DOCKER_CREDENTIALS_ID,
                    passwordVariable: "dockerHubPass",
                    usernameVariable: 'dockerHubUser')]) {
                        sh 'docker login -u ${dockerHubUser} -p ${dockerHubPass}'
                        sh 'docker push $DOCKER_IMAGE'
                        sh 'docker logout'
                }
            }
        }
        stage('TRIVY IMAGE SCAN') {
            steps {
                sh """
                trivy image --severity CRITICAL,HIGH $DOCKER_IMAGE || echo "Trivy image scan completed."
                """
            }
        } 
        stage('Test') {
            steps {
                echo "Running tests..."
                // Add test commands here if required
                echo "Tests completed!"
            }
        }
        stage('Deploy') {
            steps {
                echo "Stopping and removing existing containers..."
                sh '''
                    # Stop all running containers
                    docker ps -q | xargs -r docker stop
                    # Remove all stopped containers
                    docker ps -aq | xargs -r docker rm
                '''
                echo "Existing containers stopped and removed."

                echo "Deploying the application..."
                sh 'docker compose up -d'
                echo "Application deployed successfully!"
            }
        }
    }
}
