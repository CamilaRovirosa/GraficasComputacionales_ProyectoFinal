/* Referencias
	Modelo de Cara
	  "author": "nilanka (https://sketchfab.com/nilanka)",
      "license": "CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)",
      "source": "https://sketchfab.com/3d-models/human-head-3d-model-09b9fdbb9acb4d1186191b6f3c0e4955",
      "title": "Human Head 3D Model"
*/

/* 
	Segunda Entrega
	Camila Rovirosa Ochoa 
	A01024192

	En esta entrega agrege el modelo de rostro y genere las esferas para que aparecieran al azar alrededor de la modelo
	y tengan colores random hay luz y el modelo rota sobre su eje z
*/
// Setup

let container; 
let camera;
let renderer;
let scene;
let face;
let light1;
let light2; 
let light3;

function init(){
  //canvas = document.querySelector('#face');

  //Scene
  scene = new THREE.Scene();

  //Camera
  camera = new THREE.PerspectiveCamera(
    60, 
    window.innerWidth/window.innerHeight,
    0.1, 
    1000 );
	camera.position.z = 30; 

  //Light
	ambient = new THREE.AmbientLight(0x404040);
	scene.add(ambient);
	
	//Light 1
	const sphere = new THREE.SphereGeometry(0.5, 16, 8);
	material = new THREE.MeshPhongMaterial({color: 0xFF0000, specular:0xFFFFFF, shininnes:30,
		map: new THREE.TextureLoader().load( "./models/textures/MachineryWall_baseColor.png" ),
		normalmap: new THREE.TextureLoader().load( "./models/textures/MachineryWall_normal.png" ), }),
	  mesh = new THREE.Mesh(sphere, material);
	 light1 = new THREE.PointLight(0xFF0000, 20);
	//wire = new THREE.WireframeHelper(mesh, 0x99ff00);
    //helper = new THREE.PointLightHelper(Plight);

	light1.add( new THREE.Mesh( sphere, material ) );
	scene.add(sphere);
	scene.add(light1);
	//scene.add(helper);
	
	//Light 2
	material = new THREE.MeshPhongMaterial({color: 0x00FF00, specular:0xFFFFFF, shininnes:30,
		map: new THREE.TextureLoader().load( "./models/textures/MachineryWall_baseColor.png" ),
		normalmap: new THREE.TextureLoader().load( "./models/textures/MachineryWall_normal.png" ),}),
	  mesh = new THREE.Mesh(sphere, material);
	 light2 = new THREE.PointLight(0x00FF00, 20);
	//wire = new THREE.WireframeHelper(mesh, 0x99ff00);
    //helper = new THREE.PointLightHelper(Plight);

	light2.add( new THREE.Mesh( sphere, material ) );
	scene.add(sphere);
	scene.add(light2);
	//scene.add(helper);

	//Light 3
	material = new THREE.MeshPhongMaterial({color: 0x0000FF, specular:0xFFFFFF, shininnes:30,
		map: new THREE.TextureLoader().load( "./models/textures/MachineryWall_baseColor.png" ),
		normalmap: new THREE.TextureLoader().load( "./models/textures/MachineryWall_normal.png" ),}),
	  mesh = new THREE.Mesh(sphere, material);
	 light3 = new THREE.PointLight(0x0000FF, 20);
	//wire = new THREE.WireframeHelper(mesh, 0x99ff00);
    //helper = new THREE.PointLightHelper(Plight);

	light3.add( new THREE.Mesh( sphere, material ) );
	scene.add(sphere);
	scene.add(light3);
	//scene.add(helper);

  //Renderer
  renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio);

  document.body.appendChild( renderer.domElement);
  
  //Light Circles
  var geometry = new THREE.IcosahedronGeometry(0.7, 0);
  var colour; 

  meshX = -6;
  for (var i=0; i<15; i++){
	colour = new THREE.Color();
    colour.setHex(Math.random() * 0xffffff);
    
	var material = new THREE.MeshLambertMaterial({
		color: colour,
		emissive: colour,
		map: new THREE.TextureLoader().load( "./models/textures/MachineryWall_baseColor.png" ),
		normalmap: new THREE.TextureLoader().load( "./models/textures/MachineryWall_normal.png" ),
	})
	var mesh = new THREE.Mesh(geometry,material);
	mesh.position.x=(Math.random() - 0.5) *30;
	mesh.position.y=(Math.random() - 0.5) *20;
	mesh.position.z=(Math.random() - 0.5) *40;
	scene.add(mesh);
	meshX +=1;
  }
 
  //load
  	//var map = new THREE.TextureLoader().load( "./models/textures/disco.jpg" );
	//map.encoding = THREE.sRGBEncoding;
	//map.flipY = false;
  	let loader = new THREE.GLTFLoader();
  	loader.load('./models/scene.gltf', function(gltf) {
		scene.add(gltf.scene);
		console.log(gltf);
		face = gltf.scene.children[0];
		/*mesh.material = new THREE.MeshPhongMaterial({
			map: map,
			color: 0x0000ff,
		});*/
		animate();
	}, undefined, function ( error ) {

		console.error( error );
	});

}
// Light movement
function update() {

	const time = Date.now() * 0.0005;

	light1.position.x = Math.sin( time * 0.7 ) * 20;
	light1.position.y = Math.cos( time * 0.5 ) * 30;
	light1.position.z = Math.cos( time * 0.3 ) * 20;

	light2.position.x = Math.sin( time * 0.7 ) * 10;
	light2.position.y = Math.cos( time * 0.5 ) * 20;
	light2.position.z = Math.sin( time * 0.3 ) * 30;

	light3.position.x = Math.cos( time * 0.7 ) * 10;
	light3.position.y = Math.sin( time * 0.5 ) * 20;
	light3.position.z = Math.sin( time * 0.3 ) * 40;


}
function animate() {
	requestAnimationFrame(animate);

	face.rotation.z += 0.01;
	update();
	renderer.render(scene, camera);
}
function onWindowResize() {
	// Camera frustum aspect ratio
	camera.aspect = window.innerWidth / window.innerHeight;
	// After making changes to aspect
	camera.updateProjectionMatrix();
	// Reset size
	renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize, false);
init();