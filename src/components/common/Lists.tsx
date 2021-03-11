import { Button } from './Buttons';
import { Label } from './Inputs';

interface ListHeaderAddRemove {
  title: string;
  onAdd: () => void;
  onRemove: () => void;
}

export const ListHeaderAddRemove = ({ title, onAdd, onRemove }: ListHeaderAddRemove) => (
  <div className="flex flex-row justify-between mt-3">
    <Label name={title} />

    <div>
      <Button onClick={onAdd}>+</Button>
      <Button onClick={onRemove} className="ml-1">
        -
      </Button>
    </div>
  </div>
);
