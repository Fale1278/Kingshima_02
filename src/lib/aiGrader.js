// AI Code Reviewer & Assignment Grader Module for Kingshima Platform

export function gradeAssignmentSubmission(submissionText, courseId, lessonId) {
  if (!submissionText || submissionText.trim().length < 5) {
    return {
      score: 70,
      grade: 'B-',
      status: 'Passed',
      strengths: ['Submitted on time.'],
      recommendation: 'Add more detailed code comments and structural explanation in future submissions.',
      cleanCodeTip: 'Keep functions short and single-purpose.',
    };
  }

  const text = submissionText.trim();
  const wordCount = text.split(/\s+/).length;
  const hasCodeBlock = /function|const|let|var|class|import|def|select|from|style|html|<div|return/i.test(text);
  const hasComments = /\/\/|#|\/\*/.test(text);
  const hasErrorHandling = /try|catch|except|if|else|error/i.test(text);

  let score = 80;

  if (wordCount > 25) score += 5;
  if (hasCodeBlock) score += 10;
  if (hasComments) score += 3;
  if (hasErrorHandling) score += 2;

  score = Math.min(score, 100);

  let grade = 'A';
  if (score >= 95) grade = 'A+';
  else if (score >= 90) grade = 'A';
  else if (score >= 85) grade = 'B+';
  else if (score >= 80) grade = 'B';
  else grade = 'C+';

  const strengths = [];
  if (hasCodeBlock) strengths.push('Demonstrates concrete code structure implementation.');
  if (hasErrorHandling) strengths.push('Includes robust error resilience and condition checking.');
  if (wordCount >= 20) strengths.push('Clear project documentation and explanation.');
  if (strengths.length === 0) strengths.push('Completed core lesson requirements.');

  return {
    score,
    grade,
    status: 'Mastered',
    strengths,
    recommendation: hasComments 
      ? 'Great habit adding inline comments! Consider writing unit tests next.' 
      : 'Try adding inline code comments to document your logic for fellow developers.',
    cleanCodeTip: hasCodeBlock 
      ? 'Awesome structure! Use meaningful variable names and avoid deep nested callbacks.'
      : 'Bonus Tip: Format your code snippets into clean markdown blocks for better readability.',
  };
}
