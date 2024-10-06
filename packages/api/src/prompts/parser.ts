import {Ecto} from 'ecto';

export enum PromptType {
  Irrigation = 'irrigation',
}

const ecto = new Ecto({ defaultEngine: 'handlebars' });

export const parsePrompt = async (name: PromptType, data: any ) => {
  try{
    const file = Bun.file(`${__dirname}/${name}.hbs`);
    return ecto.render(await file.text(), data);
  } catch {
    throw new Error('Error parsing prompt');
  }
}

