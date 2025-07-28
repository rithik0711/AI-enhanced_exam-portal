const SchedulePromptService = require('./Ollama/schedulePromptService');
const { generateQuestions } = require('./Ollama/generateQuestions');

async function testSchedulePrompt() {
  try {
    console.log('🧪 Testing Schedule Prompt Service...\n');
    
    // Test with exam ID 1 (from the image data)
    const examId = 1;
    
    console.log(`📋 Testing with exam ID: ${examId}`);
    
    // Get exam details
    console.log('1. Fetching exam details...');
    const examDetails = await SchedulePromptService.getExamDetails(examId);
    console.log('✅ Exam details:', examDetails);
    
    // Generate prompt
    console.log('\n2. Generating prompt from schedule_exam data...');
    const prompt = await SchedulePromptService.generatePromptFromSchedule(examId);
    console.log('✅ Generated prompt:', prompt);
    
    // Generate questions (optional - comment out if you don't want to test AI generation)
    console.log('\n3. Generating questions using the prompt...');
    const questions = await generateQuestions(prompt);
    console.log('✅ Generated questions:', questions);
    
    console.log('\n🎉 Test completed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testSchedulePrompt(); 