import { Observable, Subject, combineLatest, BehaviorSubject } from 'rxjs';
import { SimulationDataService } from './../../services/simulation-data.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Category } from 'src/app/models/category';
import { map, tap } from 'rxjs/operators';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-merge-stream',
  templateUrl: './merge-stream.component.html',
  styleUrls: ['./merge-stream.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MergeStreamComponent implements OnInit {

  // Catégories afin d'initialiser le select
  public categories$: Observable<Category[]>;

  /* La catégorie séléctionnée est un Subject car on s'en sert en tant qu'observable pour merger le stream à un autre.
  Et car on s'en sert aussi en tant qu'observer afin de lui envoyer la nouvelle catégorie sélectionnée (grâce à la méthode next)
  à chaque fois qu'une nouvelle valeur est sélectionnée dans le select
  Le BehaviorSubject permet d'envoyer une première valeur par défaut (1 dans ce cas) */
  public categorySelectedSubject = new BehaviorSubject<number>(1);

  // Observable de produits qui sera merger avec le stream de la catégorie séléctionnée
  public products$: Observable<Product[]>;

  constructor(
    private simulationDataService: SimulationDataService
  ) { }

  public ngOnInit(): void {
    // Initialisation du select
    this.categories$ = this.simulationDataService.getCategories();

    /* CombineLatest est une méthode statique qui permet de merger deux streams (et de prendre la dernière valeur de chaque stream)
    La méthode prend en entrée deux Observables donc pour le subject on le cast en observable avec "asObservable" */
    this.products$ = combineLatest(
      this.simulationDataService.getProducts(),
      this.categorySelectedSubject.asObservable()
    ).pipe(
      // On filtre les produits afin de ne renvoyer que les produits correspondant à la catégorie séléctionnée
      map(([products, categorySelected]) => products.filter(product => product.category === categorySelected))
    );
  }

  // A chaque fois qu'une nouvelle valeur est séléctionnée dans le select, on envoie la valeur dans le subject
  public changeCategorySelected(categoryId: number) {
    this.categorySelectedSubject.next(+categoryId);
  }
}
