import { Injectable } from '@angular/core';
import {  Type,ViewChild, ViewContainerRef, ComponentFactory, 
    ComponentFactoryResolver, ComponentRef } from '@angular/core';

@Injectable()
export class DynamicCreateService {

  componentRef: ComponentRef<any>;

  constructor(private resolver: ComponentFactoryResolver) { }

  createDynamicComponent(container:ViewContainerRef,component: Type<any>,id: number){
  	let factory = this.resolver.resolveComponentFactory(component);
  	this.componentRef = container.createComponent(factory);
  	this.componentRef.instance.id = id;
  }

}
