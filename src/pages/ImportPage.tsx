
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ImportForm from "@/components/ImportForm";

const ImportPage = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Import Portfolio</h1>
      
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Management</CardTitle>
            <CardDescription>
              Import your portfolio data to analyze performance and loan-to-value ratios
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Upload your portfolio data from a CSV file or paste the data directly. The system will 
              analyze the assets and provide you with valuable insights including loan-to-value ratios
              and risk assessment.
            </p>
            
            <ImportForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ImportPage;
