docker login registry.gitlab.com -u lester.wei@rayprosoft.com
docker build --build-arg -t registry.gitlab.com/rayprosoft/turnkey-gaming-system/lobby-t6:dev .
docker push registry.gitlab.com/rayprosoft/turnkey-gaming-system/lobby-t6:dev
pause