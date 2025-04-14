// utils/gameHelpers.js
// وظائف مساعدة للعبة

/**
 * إنشاء شبكة سداسية للعبة
 * @param {number} rows عدد الصفوف
 * @param {number} cols عدد الأعمدة
 * @param {Array} letters مصفوفة الحروف المتاحة
 * @returns {Object} شبكة سداسية
 */
export const generateHexGrid = (rows = 5, cols = 5, letters) => {
  const grid = {};
  const arabicLetters = letters || 'أبتثجحخدذرزسشصضطظعغفقكلمنهوي';
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cellId = `${row}-${col}`;
      const randomIndex = Math.floor(Math.random() * arabicLetters.length);
      const letter = typeof arabicLetters === 'string' 
        ? arabicLetters[randomIndex] 
        : arabicLetters[randomIndex];
      
      grid[cellId] = {
        id: cellId,
        row,
        col,
        letter,
        team: 0, // 0: محايد، 1: الفريق الأول، 2: الفريق الثاني
        captured: false,
        capturedBy: null,
        capturedAt: null
      };
    }
  }
  
  return grid;
};

/**
 * التحقق من شرط الفوز
 * @param {Object} hexGrid شبكة سداسية
 * @returns {Object} نتيجة التحقق من شرط الفوز
 */
export const checkWinCondition = (hexGrid) => {
  // تنفيذ منطق التحقق من الفوز
  // على سبيل المثال، التحقق مما إذا كان الفريق قد أكمل مسارًا من جانب إلى الجانب المقابل
  
  // منطق مؤقت للتوضيح
  const team1Cells = Object.values(hexGrid).filter(cell => cell.team === 1);
  const team2Cells = Object.values(hexGrid).filter(cell => cell.team === 2);
  
  if (team1Cells.length >= 13) { // أكثر من نصف الخلايا
    return { winner: 1 };
  } else if (team2Cells.length >= 13) {
    return { winner: 2 };
  }
  
  return { winner: null };
};

/**
 * إعادة ترتيب الحروف في الشبكة السداسية
 * @param {Object} hexGrid شبكة سداسية
 * @param {Array} letters مصفوفة الحروف المتاحة
 * @returns {Object} شبكة سداسية معاد ترتيبها
 */
export const shuffleHexGrid = (hexGrid, letters) => {
  const arabicLetters = letters || 'أبتثجحخدذرزسشصضطظعغفقكلمنهوي';
  const newGrid = { ...hexGrid };
  
  // إعادة تعيين حروف عشوائية جديدة لكل خلية
  Object.keys(newGrid).forEach(cellId => {
    const randomIndex = Math.floor(Math.random() * arabicLetters.length);
    const letter = typeof arabicLetters === 'string' 
      ? arabicLetters[randomIndex] 
      : arabicLetters[randomIndex];
    
    newGrid[cellId] = {
      ...newGrid[cellId],
      letter
    };
  });
  
  return newGrid;
};

/**
 * تحديث ألوان الفرق في الشبكة السداسية
 * @param {Object} hexGrid شبكة سداسية
 * @param {Object} colors ألوان الفرق
 * @returns {Object} شبكة سداسية محدثة
 */
export const updateTeamColors = (hexGrid, colors) => {
  // تحديث ألوان الفرق في الشبكة السداسية
  // هذه الوظيفة قد تكون مفيدة إذا كنت تخزن معلومات الألوان في الشبكة نفسها
  
  return hexGrid;
};

/**
 * التحقق من صحة الإجابة
 * @param {string} answer إجابة اللاعب
 * @param {string} letter الحرف المطلوب
 * @returns {boolean} صحة الإجابة
 */
export const validateAnswer = (answer, letter) => {
  // التحقق من أن الإجابة تبدأ بالحرف المطلوب
  if (!answer || !letter) return false;
  
  // تنظيف الإجابة وإزالة المسافات والعلامات
  const cleanAnswer = answer.trim().replace(/[^\u0600-\u06FF]/g, '');
  
  // التحقق من أن الإجابة تبدأ بالحرف المطلوب
  return cleanAnswer.startsWith(letter);
};

/**
 * توليد سؤال عشوائي
 * @param {string} letter الحرف المطلوب
 * @returns {Object} سؤال عشوائي
 */
export const generateQuestion = (letter) => {
  // قائمة أنواع الأسئلة
  const questionTypes = [
    'اسم',
    'حيوان',
    'نبات',
    'جماد',
    'بلد',
    'مدينة',
    'طعام',
    'مهنة',
    'رياضة',
    'لون'
  ];
  
  // اختيار نوع سؤال عشوائي
  const randomType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
  
  return {
    id: Date.now().toString(),
    type: randomType,
    letter,
    text: `اذكر ${randomType} يبدأ بحرف "${letter}"`,
    createdAt: new Date().toISOString()
  };
};

export default {
  generateHexGrid,
  checkWinCondition,
  shuffleHexGrid,
  updateTeamColors,
  validateAnswer,
  generateQuestion
};
