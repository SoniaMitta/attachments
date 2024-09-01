using {com.satinfotech.metro as metro} from '../db/schema';

service hydmetro  {
  entity train as projection on metro.train;
  action uploadData() returns Boolean;
}

annotate hydmetro.train with @odata.draft.enabled;

