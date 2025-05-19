"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var DealDescription_exports = {};
__export(DealDescription_exports, {
  dealFields: () => dealFields,
  dealOperations: () => dealOperations
});
module.exports = __toCommonJS(DealDescription_exports);
const dealOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["deal"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a deal",
        action: "Create a deal"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a deal",
        action: "Delete a deal"
      },
      {
        name: "Get",
        value: "get",
        description: "Retrieve a deal",
        action: "Get a deal"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Retrieve many deals",
        action: "Get many deals"
      },
      {
        name: "Update",
        value: "update",
        description: "Update a deal",
        action: "Update a deal"
      }
    ],
    default: "create"
  }
];
const dealFields = [
  // ----------------------------------------
  //               deal: create
  // ----------------------------------------
  {
    displayName: "Amount",
    name: "amount",
    description: "Value of the deal",
    type: "number",
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ["deal"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Name",
    name: "name",
    description: "Name of the deal",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["deal"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["deal"],
        operation: ["create"]
      }
    },
    options: [
      {
        displayName: "Base Currency Amount",
        name: "base_currency_amount",
        type: "number",
        default: 0,
        description: "Value of the deal in base currency"
      },
      {
        displayName: "Campaign Name or ID",
        name: "campaign_id",
        type: "options",
        default: "",
        typeOptions: {
          loadOptionsMethod: "getCampaigns"
        },
        description: 'ID of the campaign that landed this deal. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
      },
      {
        displayName: "Currency Name or ID",
        name: "currency_id",
        type: "options",
        default: "",
        typeOptions: {
          loadOptionsMethod: "getCurrencies"
        },
        description: 'ID of the currency that the deal belongs to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
      },
      {
        displayName: "Deal Payment Status Name or ID",
        name: "deal_payment_status_id",
        type: "options",
        default: "",
        typeOptions: {
          loadOptionsMethod: "getDealPaymentStatuses"
        },
        description: 'ID of the mode of payment for the deal. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
      },
      {
        displayName: "Deal Pipeline Name or ID",
        name: "deal_pipeline_id",
        type: "options",
        default: "",
        typeOptions: {
          loadOptionsMethod: "getDealPipelines"
        },
        description: 'ID of the deal pipeline that it belongs to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
      },
      {
        displayName: "Deal Product Name or ID",
        name: "deal_product_id",
        type: "options",
        default: "",
        typeOptions: {
          loadOptionsMethod: "getDealProducts"
        },
        description: 'ID of the product that the deal belongs to (in a multi-product company). Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
      },
      {
        displayName: "Deal Reason Name or ID",
        name: "deal_reason_id",
        type: "options",
        default: "",
        typeOptions: {
          loadOptionsMethod: "getDealReasons"
        },
        description: `ID of the reason for losing the deal. Can only be set if the deal is in 'Lost' stage. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.`
      },
      {
        displayName: "Deal Stage Name or ID",
        name: "deal_stage_id",
        type: "options",
        default: "",
        typeOptions: {
          loadOptionsMethod: "getDealStages"
        },
        description: 'ID of the deal stage that the deal belongs to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
      },
      {
        displayName: "Deal Type Name or ID",
        name: "deal_type_id",
        type: "options",
        default: "",
        typeOptions: {
          loadOptionsMethod: "getDealTypes"
        },
        description: 'ID of the deal type that the deal belongs to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
      },
      {
        displayName: "Lead Source ID",
        name: "lead_source_id",
        type: "string",
        // not obtainable from API
        default: "",
        description: "ID of the source where deal came from"
      },
      {
        displayName: "Owner Name or ID",
        name: "owner_id",
        type: "options",
        default: "",
        typeOptions: {
          loadOptionsMethod: "getUsers"
        },
        description: 'ID of the user to whom the deal is assigned. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
      },
      {
        displayName: "Probability",
        name: "probability",
        type: "number",
        default: 0,
        typeOptions: {
          minValue: 0,
          maxValue: 100
        },
        description: "Probability of winning the deal as a number between 0 and 100"
      },
      {
        displayName: "Sales Account Name or ID",
        name: "sales_account_id",
        type: "options",
        default: "",
        typeOptions: {
          loadOptionsMethod: "getAccounts"
        },
        description: 'ID of the account that the deal belongs to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
      },
      {
        displayName: "Territory Name or ID",
        name: "territory_id",
        type: "options",
        default: "",
        typeOptions: {
          loadOptionsMethod: "getTerritories"
        },
        description: 'ID of the territory that the deal belongs to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
      }
    ]
  },
  // ----------------------------------------
  //               deal: delete
  // ----------------------------------------
  {
    displayName: "Deal ID",
    name: "dealId",
    description: "ID of the deal to delete",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["deal"],
        operation: ["delete"]
      }
    }
  },
  // ----------------------------------------
  //                deal: get
  // ----------------------------------------
  {
    displayName: "Deal ID",
    name: "dealId",
    description: "ID of the deal to retrieve",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["deal"],
        operation: ["get"]
      }
    }
  },
  // ----------------------------------------
  //               deal: getAll
  // ----------------------------------------
  {
    displayName: "View Name or ID",
    name: "view",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    displayOptions: {
      show: {
        resource: ["deal"],
        operation: ["getAll"]
      }
    },
    typeOptions: {
      loadOptionsMethod: "getDealViews"
    },
    default: ""
  },
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    description: "Whether to return all results or only up to a given limit",
    displayOptions: {
      show: {
        resource: ["deal"],
        operation: ["getAll"]
      }
    }
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    default: 50,
    description: "Max number of results to return",
    typeOptions: {
      minValue: 1
    },
    displayOptions: {
      show: {
        resource: ["deal"],
        operation: ["getAll"],
        returnAll: [false]
      }
    }
  },
  // ----------------------------------------
  //               deal: update
  // ----------------------------------------
  {
    displayName: "Deal ID",
    name: "dealId",
    description: "ID of the deal to update",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["deal"],
        operation: ["update"]
      }
    }
  },
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["deal"],
        operation: ["update"]
      }
    },
    options: [
      {
        displayName: "Amount",
        name: "amount",
        type: "number",
        default: 0,
        typeOptions: {
          minValue: 0
        },
        description: "Value of the deal"
      },
      {
        displayName: "Base Currency Amount",
        name: "base_currency_amount",
        type: "number",
        default: 0,
        typeOptions: {
          minValue: 0
        },
        description: "Value of the deal in base currency"
      },
      {
        displayName: "Campaign Name or ID",
        name: "campaign_id",
        type: "options",
        default: "",
        typeOptions: {
          loadOptionsMethod: "getCampaigns"
        },
        description: 'ID of the campaign that landed this deal. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
      },
      {
        displayName: "Currency Name or ID",
        name: "currency_id",
        type: "options",
        default: "",
        typeOptions: {
          loadOptionsMethod: "getCurrencies"
        },
        description: 'ID of the currency that the deal belongs to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
      },
      {
        displayName: "Deal Payment Status Name or ID",
        name: "deal_payment_status_id",
        type: "options",
        default: "",
        typeOptions: {
          loadOptionsMethod: "getDealPaymentStatuses"
        },
        description: 'ID of the mode of payment for the deal. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
      },
      {
        displayName: "Deal Pipeline Name or ID",
        name: "deal_pipeline_id",
        type: "options",
        default: "",
        typeOptions: {
          loadOptionsMethod: "getDealPipelines"
        },
        description: 'ID of the deal pipeline that it belongs to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
      },
      {
        displayName: "Deal Product Name or ID",
        name: "deal_product_id",
        type: "options",
        default: "",
        typeOptions: {
          loadOptionsMethod: "getDealProducts"
        },
        description: 'ID of the product that the deal belongs to (in a multi-product company). Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
      },
      {
        displayName: "Deal Reason Name or ID",
        name: "deal_reason_id",
        type: "options",
        default: "",
        typeOptions: {
          loadOptionsMethod: "getDealReasons"
        },
        description: `ID of the reason for losing the deal. Can only be set if the deal is in 'Lost' stage. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.`
      },
      {
        displayName: "Deal Stage Name or ID",
        name: "deal_stage_id",
        type: "options",
        default: "",
        typeOptions: {
          loadOptionsMethod: "getDealStages"
        },
        description: 'ID of the deal stage that the deal belongs to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
      },
      {
        displayName: "Deal Type Name or ID",
        name: "deal_type_id",
        type: "options",
        default: "",
        typeOptions: {
          loadOptionsMethod: "getDealTypes"
        },
        description: 'ID of the deal type that the deal belongs to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
      },
      {
        displayName: "Lead Source ID",
        name: "lead_source_id",
        type: "string",
        // not obtainable from API
        default: "",
        description: "ID of the source where deal came from"
      },
      {
        displayName: "Name",
        name: "name",
        type: "string",
        default: "",
        description: "Name of the deal"
      },
      {
        displayName: "Owner Name or ID",
        name: "owner_id",
        type: "options",
        default: "",
        typeOptions: {
          loadOptionsMethod: "getUsers"
        },
        description: 'ID of the user to whom the deal is assigned. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
      },
      {
        displayName: "Probability",
        name: "probability",
        type: "number",
        default: 0,
        typeOptions: {
          minValue: 0,
          maxValue: 100
        },
        description: "Probability of winning the deal as a number between 0 and 100"
      },
      {
        displayName: "Sales Account Name or ID",
        name: "sales_account_id",
        type: "options",
        default: "",
        typeOptions: {
          loadOptionsMethod: "getAccounts"
        },
        description: 'ID of the account that the deal belongs to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
      },
      {
        displayName: "Territory Name or ID",
        name: "territory_id",
        type: "options",
        default: "",
        typeOptions: {
          loadOptionsMethod: "getTerritories"
        },
        description: 'ID of the territory that the deal belongs to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  dealFields,
  dealOperations
});
//# sourceMappingURL=DealDescription.js.map