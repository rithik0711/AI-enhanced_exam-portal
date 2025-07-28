const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/student/schedule', async (req, res) => {
  try {
    console.log('📥 Fetching scheduled exams...');
    
    // First, let's check the table structure
    const [columns] = await db.execute('DESCRIBE schedule_exam');
    console.log('📊 Table structure:', columns.map(col => ({ field: col.Field, type: col.Type })));
    
    const [rows] = await db.execute('SELECT * FROM schedule_exam ORDER BY created_at DESC');
    console.log(`✅ Found ${rows.length} scheduled exams`);
    if (loading) return <div>Loading exam details...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!examMeta) return <div>No exam data found.</div>;
    
    // Use examMeta.title, examMeta.subject, examMeta.topic, etc. in your UI
    // Log raw data to see what we're getting
    if (rows.length > 0) {
      console.log('🔍 Sample exam data:', {
        id: rows[0].id,
        subject: rows[0].subject,
        topic: rows[0].topic,
        timing: rows[0].timing,
        timingType: typeof rows[0].timing,
        allFields: Object.keys(rows[0])
      });
    }
    
    // Transform the data to match the frontend expected format
    const formattedExams = rows.map(exam => {
      // Handle missing or null timing
      let timing = exam.timing;
      if (!timing || timing === null || timing === undefined) {
        console.log(`⚠️ Missing timing for exam ${exam.id}, using default`);
        timing = '00:30:00'; // Default 30 minutes
      }
      
      const formattedExam = {
        id: exam.id,
        title: exam.subject, // Use subject as title (previous way)
        subject: exam.subject,
        topic: exam.topic,
        num_of_questions: exam.num_of_questions,
        difficulty_level: exam.difficulty_level,
        total_marks: exam.total_marks,
        duration: timing, // Keep original timing format
        button: true, // All exams are available to start
        created_at: exam.created_at
      };
      
      console.log(`📋 Formatted exam ${exam.id}:`, {
        title: formattedExam.title,
        duration: formattedExam.duration,
        durationType: typeof formattedExam.duration,
        originalTiming: exam.timing
      });
      
      return formattedExam;
    });
    
    console.log('📤 Sending formatted exams to frontend');
    res.status(200).json(formattedExams);
  } catch (err) {
    console.error('❌ Failed to fetch scheduled exams:', err);
    res.status(500).json({ 
      error: 'Server error', 
      message: 'Failed to fetch scheduled exams',
      details: err.message 
    });
  }
});

module.exports = router;
