import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ResumeService {
  private resume: string = '';
  private resumeData: { summary: string; nss: string } | null = null; // Correct type

  setResume(resume: string): void {
    this.resume = resume;
  }

  getResume(): string {
    return this.resume;
  }


  setResumenss(data: { summary: string; nss: string }): void {
    this.resumeData = data;
  }
  
  getResumenss(): { summary: string; nss: string } | null {
    return this.resumeData;
  }
  
}
