import { Component, OnInit } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';
import { Category } from '../category/category.model';
import { Modal } from 'ng2-modal'
import { FormControl } from '@angular/forms';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  isError: boolean = false;
  errorMessage: string;
  model: any = {};
  category: any = {};
  categories: Category[] = [];
  allCategories: Category[] = [];

  addEnabled: boolean = false;

  private addRoleCheckbox: NgModel;

  private searchField: FormControl; //[formControl]="searchField"


  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.refreshCategory();
  }

  toggleAdd = () => {
    this.addEnabled = !this.addEnabled;
  };


  searchCategory = (categoryName: string) => {
    if (categoryName === "") {
      this.categories = this.allCategories;
    } else {
      this.categories = [];
      for (let i = 0; i < this.allCategories.length; i++) {
        if (String(this.allCategories[i].categoryName) === categoryName) {
          this.categories.push(this.allCategories[i]);
        }
      }
    }
  }

  onEdit = () => {
    this.categoryService.editCategory(this.category)
      .subscribe((res) => {
        this.refreshCategory();
      });
    this.category = {} as any;
  }

  onSubmit = (myForm: NgForm) => {
    //console.log(myForm.value);
    this.categoryService.addCategory(myForm.value)
      .subscribe((res) => {
        console.log(res);
        this.refreshCategory();
        this.toggleAdd();
        myForm.reset();
      },
      (err) => {
        this.isError = true;
        this.errorMessage = err;
        this.refreshCategory();
      });
  }

  editCategory = (categoryId: number, id: Modal) => {
    this.category = { "categoryId": categoryId, "categoryName": this.category.categoryName };
    id.open();
  }

  deleteCategory = (value: Category) => {
    this.categoryService.deleteCategory(value.categoryId)
      .subscribe((res) => {
        this.refreshCategory();
      },
      error => {
        this.isError = true;
        this.errorMessage = error;
      });
  }

  // enableIdea = (ideaId) => {
  //   this.ideaService.enableIdea(ideaId)
  //     .subscribe(
  //     data => {
  //       this.refreshCategory();
  //     },
  //     (err) => {
  //       this.isError = true;
  //       this.errorMessage = err;
  //       this.refreshCategory();
  //     }
  //     );
  // }

  // disableUser = (userId, disableReason) => {
  //   this.ideaService.disableIdea(ideaId, disableReason)
  //   .subscribe(
  //   data => {
  //     this.refreshCategory();
  //   },
  //   (err) => {
  //     this.isError = true;
  //     this.errorMessage = err;
  //     this.refreshCategory();
  //   }
  //   );
  // }

  refreshCategory = () => {
    this.categories = [];
    this.allCategories = [];
    this.categoryService.getAllCategories()
      .subscribe(
      data => {
        data.forEach(element => {
          let category = new Category(element.categoryId, element.categoryName);
          this.allCategories.push(category);
        })
      });
      this.categories = this.allCategories;
  }
}
