import jsPDF from 'jspdf';

export const exportToPDF = (shoppingList, profile, mealIdeas, respondent) => {
  const doc = new jsPDF();
  let yPosition = 20;
  const pageHeight = doc.internal.pageSize.height;
  const marginBottom = 20;

  const checkPageBreak = (height = 10) => {
    if (yPosition + height > pageHeight - marginBottom) {
      doc.addPage();
      yPosition = 20;
    }
  };

  // Title
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text(`${respondent}'s Food Preferences`, 20, yPosition);
  yPosition += 15;

  // Shopping List Section
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('SHOPPING LIST', 20, yPosition);
  yPosition += 10;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');

  Object.entries(shoppingList).forEach(([category, items]) => {
    if (items.length === 0) return;

    checkPageBreak(15);
    doc.setFont('helvetica', 'bold');
    doc.text(category, 20, yPosition);
    yPosition += 7;

    const always = items.filter(i => i.type === 'always');
    const sometimes = items.filter(i => i.type === 'sometimes');
    const never = items.filter(i => i.type === 'never');

    if (always.length > 0) {
      checkPageBreak(10);
      doc.setFont('helvetica', 'bold');
      doc.text('Always Buy:', 25, yPosition);
      yPosition += 5;
      doc.setFont('helvetica', 'normal');
      always.forEach(item => {
        checkPageBreak(6);
        doc.text(`- ${item.item}`, 30, yPosition);
        yPosition += 5;
      });
      yPosition += 2;
    }

    if (sometimes.length > 0) {
      checkPageBreak(10);
      doc.setFont('helvetica', 'bold');
      doc.text('Sometimes Buy:', 25, yPosition);
      yPosition += 5;
      doc.setFont('helvetica', 'normal');
      sometimes.forEach(item => {
        checkPageBreak(6);
        doc.text(`- ${item.item}`, 30, yPosition);
        yPosition += 5;
      });
      yPosition += 2;
    }

    if (never.length > 0) {
      checkPageBreak(10);
      doc.setFont('helvetica', 'bold');
      doc.text('Never Buy:', 25, yPosition);
      yPosition += 5;
      doc.setFont('helvetica', 'normal');
      never.forEach(item => {
        checkPageBreak(6);
        doc.text(`- ${item.item}`, 30, yPosition);
        yPosition += 5;
      });
      yPosition += 2;
    }

    yPosition += 5;
  });

  // Preference Profile Section
  checkPageBreak(20);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('PREFERENCE PROFILE', 20, yPosition);
  yPosition += 10;

  doc.setFontSize(10);

  // Top Favorites
  Object.entries(profile.topFavorites).forEach(([category, items]) => {
    if (items.length === 0) return;
    checkPageBreak(10);
    doc.setFont('helvetica', 'bold');
    doc.text(`${category.charAt(0).toUpperCase() + category.slice(1)}:`, 25, yPosition);
    yPosition += 5;
    doc.setFont('helvetica', 'normal');
    doc.text(items.join(', '), 30, yPosition, { maxWidth: 160 });
    yPosition += 8;
  });

  // Preparation Preferences
  if (Object.keys(profile.preparationPreferences).length > 0) {
    checkPageBreak(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Preparation Preferences:', 25, yPosition);
    yPosition += 5;
    doc.setFont('helvetica', 'normal');
    Object.entries(profile.preparationPreferences).forEach(([item, preps]) => {
      checkPageBreak(6);
      doc.text(`${item}: ${preps}`, 30, yPosition);
      yPosition += 5;
    });
    yPosition += 5;
  }

  // Never Buy
  if (profile.neverBuy.length > 0) {
    checkPageBreak(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Never Buy:', 25, yPosition);
    yPosition += 5;
    doc.setFont('helvetica', 'normal');
    doc.text(profile.neverBuy.join(', '), 30, yPosition, { maxWidth: 160 });
    yPosition += 10;
  }

  // Brand Specifics
  if (profile.brandSpecifics.length > 0) {
    checkPageBreak(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Brand/Flavor Specifics:', 25, yPosition);
    yPosition += 5;
    doc.setFont('helvetica', 'normal');
    profile.brandSpecifics.forEach(item => {
      checkPageBreak(6);
      doc.text(`- ${item}`, 30, yPosition);
      yPosition += 5;
    });
    yPosition += 5;
  }

  // Meal Ideas Section
  checkPageBreak(20);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('MEAL IDEAS', 20, yPosition);
  yPosition += 10;

  doc.setFontSize(10);
  mealIdeas.forEach((meal, index) => {
    checkPageBreak(15);
    doc.setFont('helvetica', 'bold');
    doc.text(`${index + 1}. ${meal.name}`, 25, yPosition);
    yPosition += 5;
    doc.setFont('helvetica', 'normal');
    doc.text(`Uses: ${meal.uses.join(', ')}`, 30, yPosition, { maxWidth: 160 });
    yPosition += 8;
  });

  // Save PDF
  doc.save(`${respondent}-food-preferences.pdf`);
};
