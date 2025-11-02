
import DividendCalculator from "@/components/dividend/DividendCalculator";

const Calculator = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dividend Calculator</h1>
          <p className="text-gray-600">Project future dividend income and portfolio growth</p>
        </div>
        <DividendCalculator />
      </div>
    </div>
  );
};

export default Calculator;
