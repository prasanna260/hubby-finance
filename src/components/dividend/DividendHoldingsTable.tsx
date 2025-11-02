
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Edit, Trash2 } from "lucide-react";
import { DividendHolding } from "@/hooks/useDividendHoldings";

interface DividendHoldingsTableProps {
  holdings: DividendHolding[];
  onEdit: (holding: DividendHolding) => void;
  onDelete: (id: string) => void;
}

const DividendHoldingsTable = ({ holdings, onEdit, onDelete }: DividendHoldingsTableProps) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Symbol</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Shares</TableHead>
            <TableHead className="text-right">Avg Price</TableHead>
            <TableHead className="text-right">Current Price</TableHead>
            <TableHead className="text-right">Yield</TableHead>
            <TableHead className="text-right">Annual Dividend</TableHead>
            <TableHead>Frequency</TableHead>
            <TableHead>Sector</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {holdings.map((holding) => {
            const gainLoss = ((holding.current_price - holding.avg_price) / holding.avg_price) * 100;
            return (
              <TableRow key={holding.id}>
                <TableCell className="font-medium">{holding.symbol}</TableCell>
                <TableCell>{holding.company_name}</TableCell>
                <TableCell className="text-right">{holding.shares}</TableCell>
                <TableCell className="text-right">${holding.avg_price.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex flex-col items-end">
                    <span>${holding.current_price.toFixed(2)}</span>
                    <Badge variant={gainLoss >= 0 ? "default" : "destructive"} className="text-xs">
                      {gainLoss >= 0 ? "+" : ""}{gainLoss.toFixed(1)}%
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="text-right">{holding.dividend_yield.toFixed(1)}%</TableCell>
                <TableCell className="text-right">${holding.annual_dividend.toFixed(2)}</TableCell>
                <TableCell>{holding.frequency}</TableCell>
                <TableCell>{holding.sector}</TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" size="sm" onClick={() => onEdit(holding)}>
                      <Edit size={14} />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Trash2 size={14} />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete the {holding.symbol} holding. This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => onDelete(holding.id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default DividendHoldingsTable;
