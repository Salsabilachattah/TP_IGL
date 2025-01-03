import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ResumeService {
  private resume: string = '';

  setResume(resume: string): void {
    this.resume = resume;
  }

  getResume(): string {
    return this.resume;
  }
}
