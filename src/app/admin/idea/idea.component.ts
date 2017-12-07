import { Component, OnInit } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';
import { Category } from '../category/category.model';
import { Modal } from 'ng2-modal'
import { FormControl } from '@angular/forms';
import { IdeaService } from '../../service/idea.service';
import { CategoryService } from '../../service/category.service';
import { Idea } from '../idea/idea.model';

@Component({
  selector: 'app-idea',
  templateUrl: './idea.component.html',
  styleUrls: ['./idea.component.css']
})
export class IdeaComponent implements OnInit {

  isError: boolean = false;
  errorMessage: string;
  model: any = {};
  idea: any = {};
  ideas: Idea[] = [];
  allIdeas: Idea[] = [];
  categories: any = [];

  addEnabled: boolean = false;

  private searchField: FormControl;


  constructor(private ideaService: IdeaService, private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.refreshIdea();
    this.categoryService.getAllCategories()
      .subscribe(
      data => {
        data.forEach(element => {
          let category = new Category(element.categoryId, element.categoryName);
          this.categories.push(category);
        });
      });
  }

  toggleAdd = () => {
    this.addEnabled = !this.addEnabled;
  };


  searchIdea = (ideaName: string) => {
    if (ideaName === "") {
      this.ideas = this.allIdeas;
    } else {
      this.ideas = [];
      for (let i = 0; i < this.allIdeas.length; i++) {
        if (String(this.allIdeas[i].ideaName) === ideaName) {
          this.ideas.push(this.allIdeas[i]);
        }
      }
    }
  }

  onEdit = () => {
    this.ideaService.editIdea(this.idea)
      .subscribe((res) => {
        this.refreshIdea();
      });
    this.idea = {} as any;
  }

  editIdea = (ideaId: number, id: Modal) => {
    this.idea = { "ideaId": ideaId, "ideaName": this.idea.ideaName };
    id.open();
  }

  deleteIdea = (value: Idea) => {
    this.ideaService.deleteIdea(value.ideaId)
      .subscribe((res) => {
        this.refreshIdea();
      },
      error => {
        this.isError = true;
        this.errorMessage = error;
      });
  }

  enableIdea = (ideaId) => {
    this.ideaService.enableIdea(ideaId)
      .subscribe(
      data => {
        this.refreshIdea();
      },
      (err) => {
        this.isError = true;
        this.errorMessage = err;
        this.refreshIdea();
      }
      );
  }

  disableIdea = (ideaId, disableReason) => {
    this.ideaService.disableIdea(ideaId, disableReason)
      .subscribe(
      data => {
        this.refreshIdea();
      },
      (err) => {
        this.isError = true;
        this.errorMessage = err;
        this.refreshIdea();
      }
      );
  }

  updateSelectValue(event: string) {
    if (event === String(0)) {
      this.ideas = this.allIdeas;
    } else {
      this.ideas = [];
      for (let i = 0; i < this.allIdeas.length; i++) {
        if (String(this.allIdeas[i].category.categoryId) === event) {
          this.ideas.push(this.allIdeas[i]);
        }
      }
    }
  }

  refreshIdea = () => {
    this.ideas = [];
    this.allIdeas = [];
    this.ideaService.getAllIdeas()
      .subscribe(
      data => {
        data.forEach(element => {
          if (element.status === "disabled") {
            let idea = new Idea(element.ideaId, element.ideaName, element.fundings.length, element.creator.username, new Category(element.category.categoryId, element.category.categoryName), true, element.operationReason);
            this.allIdeas.push(idea);
          } else {
            let idea = new Idea(element.ideaId, element.ideaName, element.fundings.length, element.creator.username,new Category(element.category.categoryId, element.category.categoryName) false, null);
            this.allIdeas.push(idea);
          }
        })
      });
    this.ideas = this.allIdeas;
  }

}
