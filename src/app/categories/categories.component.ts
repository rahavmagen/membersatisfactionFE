import { Component, OnInit } from '@angular/core';
import { SaveCategoryService } from '../services/save-category.service';
import { ExpireCategoryService } from '../services/expire-category.service';
import { Category } from '../models/category';
import {ConfirmationService, Message} from 'primeng/api';
import { GetEffectiveCategoriesService } from '../services/get-effective-categories.service';




@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categoriesList: Category[] = null;
  selectedCategory: Category = null;
  newCategory: Category;
  displayDialog: boolean;
  isNewCategoryAdded: boolean;
  currentDate: Date;
  displayNoCategoryMsg = false;
  msgs: Message[] = [];

  constructor(
    private getEffectiveCategoriesService: GetEffectiveCategoriesService,
    private saveCategoryService: SaveCategoryService ,
    private confirmationService: ConfirmationService,
    private expireCategoryService: ExpireCategoryService
  ) {}

  ngOnInit() {
    this.getCategories();
    this.currentDate = new Date();
  }

  addNewCategory() {
    this.isNewCategoryAdded = true;
    this.newCategory = {};
    this.displayDialog = true;
  }

  saveNewCategory() {
    const categoriesList = [...this.categoriesList];

    if (this.isNewCategoryAdded) {
      this.saveCategoryService.save(this.newCategory).subscribe(
        data => {
          console.log(data + 'data');
          this.newCategory = data;
          this.newCategory.effectiveDate = this.currentDate;
          this.newCategory.questions = [];
          categoriesList.push(this.newCategory);
          this.categoriesList = categoriesList;
          this.newCategory = null;
          this.displayDialog = false;
        },
        error => {
          console.log('error' + error);
        }
      );
    } else {
      categoriesList[
        this.categoriesList.indexOf(this.selectedCategory)
      ] = this.newCategory;
    }
    this.categoriesList = categoriesList;
  }

  cancelCategoryPopUp() {
    console.log(' cancel - do nothing ');
    this.newCategory = null;
    this.displayDialog = false;
  }

  getCategories() {
    this.getEffectiveCategoriesService.getCategories().subscribe(
      data => {
        this.categoriesList = data;
        console.log('categories size =' + this.categoriesList.length);

        // tslint:disable-next-line:forin
        for (const i in this.categoriesList) {
          console.log(this.categoriesList[i].categoryName);
        }
      },
      error => {
        console.log('error' + error);
        this.msgs = [];
          this.msgs.push({severity:'error', summary:' Error Message', detail:'there was a problem loading the page -please try again later'});
      }
    );
  }




  confirmDeleteCategory() {

    if ( this.selectedCategory != null) {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to remove ' + this.selectedCategory.categoryName + ' category?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            console.log('you accepted');
            this.expireCategoryService.expire(this.selectedCategory).subscribe(
              () => {
                console.log('category  expired');
                const index: number = this.categoriesList.indexOf(this.selectedCategory);
                if (index !== -1) {
                  this.categoriesList.splice(index, 1);
                }
              },
              error => {
                console.log('error' + error);
              }
            );
        },
        reject: () => {
          console.log('you rejected');
        }
      });
    } else {
      console.log('category not selected');
      this.displayNoCategoryMsg = true;
    }

}




}
