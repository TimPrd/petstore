import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { config } from 'rxjs';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  urlLogOrCreate: string;
  @ViewChild("scene") divView: ElementRef;
  loader: GLTFLoader;
  clock: THREE.Clock;

  constructor(private loadingService: LoadingService, private router: Router) { }
  ngOnInit(): void {
    this.urlLogOrCreate = this.router.url.split('/').pop();
  }

  ngAfterViewInit() {
    this.generate3D();
  }

  loadModel() {
    return new Promise((resolve, reject) => {
      this.loader.load('../../assets/dog.glb', data => resolve(data), undefined, undefined);
    });
  }

  async import3DObject() {
    const gltf: any = await this.loadModel()
    gltf.scene.scale.set(2, 2, 2)
    gltf.scene.position.setY(-100);
    return gltf;
  }

  async generate3D() {
    const scene = new THREE.Scene();
    this.loader = new GLTFLoader();
    this.clock = new THREE.Clock();

    const width = this.divView.nativeElement.offsetWidth
    const height = this.divView.nativeElement.offsetHeight
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(width, height);
    this.divView.nativeElement.appendChild(renderer.domElement);

    const ambi = new THREE.AmbientLight(0x404040); // soft white light

    const light = new THREE.PointLight(0xffffff, 3);
    light.position.set(0, 10, 280);

    scene.add(ambi)
    scene.add(light);


    const gltf = await this.import3DObject()
    const mixer = new THREE.AnimationMixer(gltf.scene);
    const action = mixer.clipAction(gltf.animations[3]);
    action.play();
    scene.add(gltf.scene);

    camera.position.z = 280;

    const animate = () => {
      requestAnimationFrame(animate);
      const delta = this.clock.getDelta();
      if (mixer) mixer.update(delta);
      renderer.render(scene, camera);
    };

    animate();
  }

  // @HostListener('window:resize', ['$event'])
  // onResize(event) {
  //   // this.generate3D()
  // }

}
