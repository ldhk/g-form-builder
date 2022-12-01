import {
  Injectable,
  Type,
  ViewContainerRef,
  ComponentFactoryResolver,
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentGeneratorService {

  constructor(protected componentFactoryResolver: ComponentFactoryResolver) {}

  renderDynamicComponent<TComponent>(
    dynamicComponent: Type<TComponent>,
    viewContainerRef: ViewContainerRef,
    params?: any
  ): TComponent {
    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(dynamicComponent);
    const componentRef = viewContainerRef.createComponent(componentFactory);
    const dynamicComponentInstance = <TComponent>componentRef.instance;

    if (params) {
      Object.keys(params).forEach((propertyName) => {
        dynamicComponentInstance[propertyName] = params[propertyName];
      });
    }
    return dynamicComponentInstance;
  }
}
