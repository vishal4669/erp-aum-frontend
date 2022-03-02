//Quotation Dropdown Constant
const quotation_dropdown = {
  quotation_type : ["Sample","Injection","Metal"],
  quotation_status : ["Open","In Process","To Be Distributed","Approval Request","Approved"],
  quotation_grand_total : [{id:"1",label:"Yes"},{id:"2",label:"No"}],
};

//Quotation Dropdown Constant
const booking_dropdown = {
  booking_type : [{id:"0",label:"Received"},{id:"1",label:"Entry"},{id:"2",label:"Temp"},{id:"3",label:"W"},
  {id:"4",label:"Testing"},{id:"5",label:"Data Fillup"},{id:"6",label:"Report"},{id:"7",label:"Dispatched"},
  {id:"8",label:"Invoice"},{id:"9",label:"Cancel"}],
  report_type : [{id:"0",label:"FP"},{id:"1",label:"RM"},{id:"2",label:"OT"},{id:"3",label:"TP"},
  {id:"4",label:"ADL"},{id:"5",label:"AYUSH"}],
  common_options1 : [{id:"0",label:"N/S"},{id:"1",label:"None"},{id:"2",label:"N/A"}], // mfg options, exp options
  common_options2 : [{id:"0",label:"N/A"},{id:"1",label:"None"},{id:"2",label:"N/S"}], // d Formate Options, Grade Options, Project Options, sampleling date from / to options
  yes_no_options : [{id:"0",label:"No"},{id:"1",label:"Yes"}], // is report Dispatched, signature, nable scope, sample condition options,by pass
  verified_by : [{id:"0",label:"None"},{id:"1",label:"QA"}],
  cancel : [{id:"0",label:"None"},{id:"1",label:"Yes"},{id:"2",label:"No"}],
  priority : [{id:"0",label:"High"},{id:"1",label:"Medium"},{id:"2",label:"Low"}],
  discipline : [{id:"0",label:"Chemical"},{id:"1",label:"Biological"}],
  group : [{id:"0",label:"Drugs and Pharmaceuticals"},{id:"1",label:"Food of Agriculture Product"}],
  statement_confirmity : [{id:"0",label:"Pass"},{id:"1",label:"Intermediate"},{id:"2",label:"Fail"}],
  sample_received_through : [{id:"0",label:"By Courier"},{id:"1",label:"By Hand"},{id:"2",label:"By Collection"}],
  dispatch_mode : ["By Courier","By Hand Delivery","Collect By Party"],
  chemist : [{id:"0",label:"Yes"}],
  parent_child : [{id:"0",label:"Parent"},{id:"1",label:"Child"}]
};

export { quotation_dropdown, booking_dropdown };
