function rem_image() {
  image_id="pipeline-amourdivin_app"
  
  docker rm -f $(docker ps -a -q --filter="ancestor=$image_id") 2>&- || echo "Found no containers for that image"
  docker rmi $image_id
  echo "Image deleted successfully"
}

function docker_clean() {
  pattern="*"

  for image_id in `docker images | grep $pattern | awk '{ print $3}'`
  do
      echo Removing... $image_id
      rem_image $image_id
  done
}
