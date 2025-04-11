import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Category } from "../data/category";
import { environment } from "../environments/environment";

@Injectable()
export class CategoryService{
    private categoriesUrl = `${environment.apiUrl}/v1/categories`;
    
    constructor(private http: HttpClient) { }

    getAll() : Observable<Category[]> {
        return this.http.get<Category[]>(this.categoriesUrl);
    }

    create(category: Category) : Observable<Category> {
        return this.http.post<Category>(this.categoriesUrl, category);
    }

    update(category: Category) : Observable<Category> {
        return this.http.put<Category>(this.categoriesUrl + '/' + category.id, category);
    }
    
    delete(category: Category) : Observable<boolean> {
        return this.http.delete<boolean>(this.categoriesUrl + '/' + category.id);
    }
}
