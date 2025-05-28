import { FC } from 'react';
import { Preloader, IngredientDetailsUI } from '@ui';
import { selectIngredientById } from '@slices';
import { useParams } from 'react-router-dom';
import { RootState, useSelector } from '@store';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id?: string }>();

  if (!id) {
    return <Preloader />;
  }

  const ingredientData = useSelector((state: RootState) =>
    selectIngredientById(state, id)
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
