$( document ). ready( function(){

  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2();

  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  let renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  $( "body" ).append( renderer.domElement );

  scene.add( camera );
  camera.position.z = 6;

  let light = new THREE.PointLight( 0xffffff, 1, 100 );
  light.position.set( 0, 0, camera.position.z );
  scene.add( light );

  let rotation = 5;
  let rotationInterval = 360/rotation;

  let contenedorCirculos = new THREE.Object3D();
  scene.add( contenedorCirculos );

  for ( let i = 0; i < 360; i+=rotationInterval ){
    let circulo = new THREE.Object3D();
    circulo.rotation.y += toRadians(i);
    contenedorCirculos.add( circulo );
  }

  let num = 50;
  let interval = 360/num;
  let radius = 3;


for ( let j = 0; j < contenedorCirculos.children.length; j++) {
  for( let i = 0; i < 360; i+= interval ){
    let geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
    let material = new THREE.MeshLambertMaterial({ color: 0x00FF00 });
    let nodo = new THREE.Mesh( geometry, material );
    nodo.position.x = Math.cos( toRadians ( i ) ) * radius;
    nodo.position.y = Math.sin( toRadians ( i ) ) * radius;
    console.log(toRadians (i) );
    contenedorCirculos.children[ j ].add( nodo );
  }
}

  function animate(){
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
    contenedorCirculos.rotation.y += 0.01;

    raycaster.setFromCamera( mouse, camera );

  	// calculate objects intersecting the picking ray
  	var intersects = raycaster.intersectObjects( contenedorCirculos.children, true);
  	for ( var i = 0; i < intersects.length; i++ ) {
  		intersects[ i ].object.material.color.set( 0xff0000 );
  }
}

      animate();

      function toRadians(degrees){
        var pi = Math.PI;
        return degrees * (pi/180);
      }

      $( document ).on( 'mousemove', function( e ){
        console.log( e );
          mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
      	  mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
      });

}); // document ready
