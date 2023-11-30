import React, { useState } from 'react';
import mathsteps from 'mathsteps';

const explanations = {
  "ADD_TO_BOTH_SIDES": "Ajouter des deux côtés",
  "BREAK_UP_FRACTION": "Décomposer la fraction",
  "CANCEL_MINUSES": "Annuler les signes moins",
  "COLLECT_AND_COMBINE_LIKE_TERMS": "Collecter et combiner les termes semblables",
  "COLLECT_LIKE_TERMS": "Collecter les termes semblables",
  "DIVIDE_FROM_BOTH_SIDES": "Diviser des deux côtés",
  "FACTOR_SYMBOL": "Factoriser le symbole",
  "FIND_GCD": "Trouver le PGCD (plus grand commun diviseur)",
  "FIND_ROOTS": "Trouver les racines",
  "MULTIPLY_TO_BOTH_SIDES": "Multiplier des deux côtés",
  "SIMPLIFY_ARITHMETIC": "Simplifier l'arithmétique",
  "SIMPLIFY_DIVISION": "Simplifier la division",
  "SIMPLIFY_LEFT_SIDE": "Simplifier le côté gauche",
  "SIMPLIFY_RIGHT_SIDE": "Simplifier le côté droit",
  "SIMPLIFY_TERMS": "Simplifier les termes",
  "SOLVE_FOR_SYMBOL": "Résoudre pour le symbole",
  "SUBTRACT_FROM_BOTH_SIDES": "Soustraire des deux côtés"
}


const EquationSolver = () => {
  const [equation, setEquation] = useState('');
  const [solutionDetails, setSolutionDetails] = useState([]);

  const solveEquation = () => {
    try {
      const steps = mathsteps.solveEquation(equation);
      const detailedSteps = steps.map(step => ({
        beforeChange: step.oldEquation.ascii(),
        changeType: step.changeType,
        afterChange: step.newEquation.ascii(),
        substepsCount: step.substeps.length
      }));
      setSolutionDetails(detailedSteps);
    } catch (error) {
      console.error('Error solving equation:', error);
      setSolutionDetails([]);
    }
  };

  return (
    <div>
      <textarea 
        value={equation} 
        onChange={(e) => setEquation(e.target.value)}
        placeholder="Enter equation (e.g., 2x + 3 = 15)"
        rows="4" // You can adjust the number of rows as needed
      />
      <button onClick={solveEquation}>Solve</button>
      <div>
        {solutionDetails.map((detail, index) => (
          <div key={index}>
            <p>Avant: {detail.beforeChange}</p>
            <p>Action: {explanations[detail.changeType]}</p>
            <p>Après: {detail.afterChange}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EquationSolver;
