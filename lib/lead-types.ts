export type LeadFormValues = {
  name: string;
  mobile: string;
  language?: string;
  comment?: string;
};

export type HospitalLeadConfig = {
  hospitalId?: string;
  source?: string;
  website?: string;
  unitnameC?: string;
  formEnquiryType?: string;
  formEnquirySubtype?: string;
  formName?: string;
  formCampaignName?: string;
  enquirySource?: string;
  campaignDefaults?: Record<string, string>;
  endpoint?: string;
  headers?: Record<string, string>;
  queryParams?: Record<string, string>;
  payload?: Record<string, unknown>;
  [key: string]: unknown;
};

export type HospitalLeadContext = {
  slug: string;
  hospitalName: string;
  hospitalShortName?: string;
  regionLabel?: string;
  address: string;
  phone: Record<string, unknown>;
  brand: string;
};

export type CampaignData = Record<string, string | undefined> & {
  referrer?: string;
  device?: string;
};

export type LeadSubmitMeta = {
  pageUrl?: string;
  submittedAt?: string;
  vertical?: string;
  source?: string;
  hospitalId?: string;
};

export type LeadSubmitInput = {
  form: LeadFormValues;
  lead: HospitalLeadConfig;
  hospital: HospitalLeadContext;
  campaign: CampaignData;
  meta: LeadSubmitMeta;
};

export type LeadSubmitContext = {
  form: Required<Pick<LeadFormValues, "name" | "mobile">> & {
    language: string;
    comment: string;
  };
  lead: HospitalLeadConfig;
  hospital: HospitalLeadContext;
  campaign: CampaignData;
  meta: LeadSubmitMeta & {
    pageUrl: string;
    submittedAt: string;
    vertical: string;
    source: string;
    hospitalId: string;
  };
  derived: {
    description: string;
    appointmentDate: string;
  };
};

export type SubmitLeadResult = {
  requestId: string;
};
