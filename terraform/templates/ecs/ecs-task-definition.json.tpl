[
  {
    "name": "${container_name}",
    "image": "${app_image}",
    "cpu": ${fargate_cpu},
    "memory": ${fargate_memory},
    "networkMode": "awsvpc",
    "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/cb-app",
          "awslogs-region": "${aws_region}",
          "awslogs-stream-prefix": "ecs"
        }
    },
    "portMappings": [
      {
        "containerPort": ${app_port},
        "hostPort": ${app_port}
      }
    ],
    "environment" : [
      { "name" : "SPRING_ENV", "value" : "prod" },
      { "name" : "PROD_DB_PASSWD", "value" : "${PROD_DB_PASSWD}" },
      { "name" : "PROD_DB_USER", "value" : "${PROD_DB_USER}" },
      { "name" : "PROD_DB_URI", "value" : "${PROD_DB_URI}" }
    ]
  }
]
