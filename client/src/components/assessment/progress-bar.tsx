import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  current: number;
  total: number;
  progress: number;
}

const ProgressBar = ({ current, total, progress }: ProgressBarProps) => {
  return (
    <div className="mb-8" data-testid="progress-container">
      <Progress value={progress} className="h-3 mb-4" data-testid="progress-bar" />
      <div className="flex justify-between items-center text-sm">
        <span className="text-muted-foreground" data-testid="question-counter">
          Question {current} of {total}
        </span>
        <span className="text-muted-foreground" data-testid="progress-percentage">
          {Math.round(progress)}% Complete
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
