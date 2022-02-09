docker login registry.gitlab.com -u lester.wei@rayprosoft.com
docker build --build-arg BuildEnv=staging -t registry.gitlab.com/rayprosoft/turnkey-gaming-system/lobby-gpi-t1:dev .
docker push registry.gitlab.com/rayprosoft/turnkey-gaming-system/lobby-gpi-t1:dev
pause