docker login registry.gitlab.com -u lester.wei@rayprosoft.com
docker build -f Dockerfile-New -t registry.gitlab.com/rayprosoft/turnkey-gaming-system/lobby-t8:merged .
docker push registry.gitlab.com/rayprosoft/turnkey-gaming-system/lobby-t8:merged
pause