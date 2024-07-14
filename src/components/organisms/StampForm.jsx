import React from 'react';
import DatePickerField from '../molecules/DatePickerField';
import FormField from '../molecules/FormField';
import SelectField from '../molecules/SelectField';
import SliderField from '../molecules/SliderField';
import { Button } from "@/components/ui/button";

const StampForm = () => (
  <form>
    <div className="grid grid-cols-2 gap-4">
      <DatePickerField id="eingegangen_am" label="Eingegangen am" />
      <DatePickerField id="faellig_am" label="Fällig am" />
      <DatePickerField id="gebucht" label="Gebucht" />
      <FormField id="konto" label="Konto" placeholder="Konto" />
      <FormField id="ev_vp" label="EV/VP" placeholder="EV/VP" />
      <FormField id="belegtext" label="Belegtext" placeholder="Belegtext" />
      <FormField id="kommentar" label="Kommentar" placeholder="Kommentar" />
      <SliderField id="skonto" label="Skonto" defaultValue={[0]} max={100} step={1} />
      <SelectField
        id="kostenstelle"
        label="Kostenstelle"
        options={[
          { value: "option1", label: "Option #1" },
          { value: "option2", label: "Option #2" },
        ]}
      />
      <SelectField
        id="vb"
        label="VB"
        options={[
          { value: "option1", label: "Option #1" },
          { value: "option2", label: "Option #2" },
        ]}
      />
    </div>
    <Button className="mt-4">Submit</Button>
  </form>
);

export default StampForm;