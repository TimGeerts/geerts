import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EMPTY, Subscription } from 'rxjs';
import { debounceTime, filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'geerts-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  @ViewChild('searchField') searchField!: ElementRef;

  searchForm!: FormGroup;
  q!: string;

  @Input() debounceTime = 500;
  @Input() minLength = 2;
  @Input() placeholder = '';
  @Input() searchFunction!: (arg: string) => void;

  private _searchSubscription!: Subscription;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      searchText: [''],
    });

    const field = this.searchForm.get('searchText');
    if (field) {
      this._searchSubscription = field.valueChanges
        .pipe(
          debounceTime(this.debounceTime),
          filter((query: string) => !query || query.length >= this.minLength),
          switchMap((query) => {
            this.q = query;
            if (this.searchFunction) {
              this.searchFunction(query);
            }
            return EMPTY;
          })
        )
        .subscribe(() => {
          //fake subscribe, who cares, result here is always EMPTY
        });
    }
  }

  resetForm(): void {
    this.q = '';
    this.searchForm.patchValue({ searchText: '' });
    this.searchField.nativeElement.focus();
  }

  public ngOnDestroy() {
    this._searchSubscription && this._searchSubscription.unsubscribe();
  }
}
