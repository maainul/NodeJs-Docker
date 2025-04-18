pipeline {
    agent { label 'mainul' }

    stages {
        stage('Clone Repo') {
            steps {
                git url: 'https://github.com/maainul/NodeJs-Docker.git', branch: 'main'
            }
        }
        stage('Build') {
            steps {
                echo "Building the Docker image..."
                sh 'docker build -t maainul/nodejs-docker:latest .'
                echo "Docker image built successfully!"
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
