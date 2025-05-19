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
var AwsElb_node_exports = {};
__export(AwsElb_node_exports, {
  AwsElb: () => AwsElb
});
module.exports = __toCommonJS(AwsElb_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
var import_ListenerCertificateDescription = require("./ListenerCertificateDescription");
var import_LoadBalancerDescription = require("./LoadBalancerDescription");
class AwsElb {
  constructor() {
    this.description = {
      displayName: "AWS ELB",
      name: "awsElb",
      icon: "file:elb.svg",
      group: ["output"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Sends data to AWS ELB API",
      defaults: {
        name: "AWS ELB"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "aws",
          required: true
        }
      ],
      properties: [
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Listener Certificate",
              value: "listenerCertificate"
            },
            {
              name: "Load Balancer",
              value: "loadBalancer"
            }
          ],
          default: "loadBalancer"
        },
        ...import_LoadBalancerDescription.loadBalancerOperations,
        ...import_LoadBalancerDescription.loadBalancerFields,
        ...import_ListenerCertificateDescription.listenerCertificateOperations,
        ...import_ListenerCertificateDescription.listenerCertificateFields
      ]
    };
    this.methods = {
      loadOptions: {
        async getLoadBalancers() {
          const returnData = [];
          const params = ["Version=2015-12-01"];
          const data = await import_GenericFunctions.awsApiRequestSOAP.call(
            this,
            "elasticloadbalancing",
            "GET",
            "/?Action=DescribeLoadBalancers&" + params.join("&")
          );
          let loadBalancers = data.DescribeLoadBalancersResponse.DescribeLoadBalancersResult.LoadBalancers.member;
          if (!Array.isArray(loadBalancers)) {
            loadBalancers = [loadBalancers];
          }
          for (const loadBalancer of loadBalancers) {
            const loadBalancerArn = loadBalancer.LoadBalancerArn;
            const loadBalancerName = loadBalancer.LoadBalancerName;
            returnData.push({
              name: loadBalancerName,
              value: loadBalancerArn
            });
          }
          return returnData;
        },
        async getLoadBalancerListeners() {
          const returnData = [];
          const loadBalancerId = this.getCurrentNodeParameter("loadBalancerId");
          const params = ["Version=2015-12-01", "LoadBalancerArn=" + loadBalancerId];
          const data = await import_GenericFunctions.awsApiRequestSOAP.call(
            this,
            "elasticloadbalancing",
            "GET",
            "/?Action=DescribeListeners&" + params.join("&")
          );
          let listeners = data.DescribeListenersResponse.DescribeListenersResult.Listeners.member;
          if (!Array.isArray(listeners)) {
            listeners = [listeners];
          }
          for (const listener of listeners) {
            const listenerArn = listener.ListenerArn;
            const listenerName = listener.ListenerArn;
            returnData.push({
              name: listenerArn,
              value: listenerName
            });
          }
          return returnData;
        },
        async getSecurityGroups() {
          const returnData = [];
          const body = ["Version=2016-11-15", "Action=DescribeSecurityGroups"].join("&");
          const data = await import_GenericFunctions.awsApiRequestSOAP.call(
            this,
            "ec2",
            "POST",
            "/",
            body,
            {},
            {
              "Content-Type": "application/x-www-form-urlencoded",
              charset: "utf-8",
              "User-Agent": "aws-cli/1.18.124"
            }
          );
          let securityGroups = data.DescribeSecurityGroupsResponse.securityGroupInfo.item;
          if (!Array.isArray(securityGroups)) {
            securityGroups = [securityGroups];
          }
          for (const securityGroup of securityGroups) {
            const securityGroupId = securityGroup.groupId;
            const securityGroupName = securityGroup.groupName;
            returnData.push({
              name: securityGroupName,
              value: securityGroupId
            });
          }
          return returnData;
        },
        async getSubnets() {
          const returnData = [];
          const body = ["Version=2016-11-15", "Action=DescribeSubnets"].join("&");
          const data = await import_GenericFunctions.awsApiRequestSOAP.call(
            this,
            "ec2",
            "POST",
            "/",
            body,
            {},
            {
              "Content-Type": "application/x-www-form-urlencoded",
              charset: "utf-8",
              "User-Agent": "aws-cli/1.18.124"
            }
          );
          let subnets = data.DescribeSubnetsResponse.subnetSet.item;
          if (!Array.isArray(subnets)) {
            subnets = [subnets];
          }
          for (const subnet of subnets) {
            const subnetId = subnet.subnetId;
            const subnetName = subnet.subnetId;
            returnData.push({
              name: subnetName,
              value: subnetId
            });
          }
          return returnData;
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    let responseData;
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    for (let i = 0; i < items.length; i++) {
      try {
        if (resource === "listenerCertificate") {
          if (operation === "add") {
            const params = ["Version=2015-12-01"];
            params.push(
              "Certificates.member.1.CertificateArn=" + this.getNodeParameter("certificateId", i)
            );
            params.push("ListenerArn=" + this.getNodeParameter("listenerId", i));
            responseData = await import_GenericFunctions.awsApiRequestSOAP.call(
              this,
              "elasticloadbalancing",
              "GET",
              "/?Action=AddListenerCertificates&" + params.join("&")
            );
            responseData = responseData.AddListenerCertificatesResponse.AddListenerCertificatesResult.Certificates.member;
          }
          if (operation === "getMany") {
            const params = ["Version=2015-12-01"];
            const returnAll = this.getNodeParameter("returnAll", 0);
            const listenerId = this.getNodeParameter("listenerId", i);
            params.push(`ListenerArn=${listenerId}`);
            if (returnAll) {
              responseData = await import_GenericFunctions.awsApiRequestSOAPAllItems.call(
                this,
                "DescribeListenerCertificatesResponse.DescribeListenerCertificatesResult.Certificates.member",
                "elasticloadbalancing",
                "GET",
                "/?Action=DescribeListenerCertificates&" + params.join("&")
              );
            } else {
              params.push("PageSize=" + this.getNodeParameter("limit", 0));
              responseData = await import_GenericFunctions.awsApiRequestSOAP.call(
                this,
                "elasticloadbalancing",
                "GET",
                "/?Action=DescribeListenerCertificates&" + params.join("&")
              );
              responseData = responseData.DescribeListenerCertificatesResponse.DescribeListenerCertificatesResult.Certificates.member;
            }
          }
          if (operation === "remove") {
            const params = ["Version=2015-12-01"];
            params.push(
              "Certificates.member.1.CertificateArn=" + this.getNodeParameter("certificateId", i)
            );
            params.push("ListenerArn=" + this.getNodeParameter("listenerId", i));
            responseData = await import_GenericFunctions.awsApiRequestSOAP.call(
              this,
              "elasticloadbalancing",
              "GET",
              "/?Action=RemoveListenerCertificates&" + params.join("&")
            );
            responseData = { sucess: true };
          }
        }
        if (resource === "loadBalancer") {
          if (operation === "create") {
            const ipAddressType = this.getNodeParameter("ipAddressType", i);
            const name = this.getNodeParameter("name", i);
            const schema = this.getNodeParameter("schema", i);
            const type = this.getNodeParameter("type", i);
            const subnets = this.getNodeParameter("subnets", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const params = ["Version=2015-12-01"];
            params.push(`IpAddressType=${ipAddressType}`);
            params.push(`Name=${name}`);
            params.push(`Scheme=${schema}`);
            params.push(`Type=${type}`);
            for (let index = 1; index <= subnets.length; index++) {
              params.push(`Subnets.member.${index}=${subnets[index - 1]}`);
            }
            if (additionalFields.securityGroups) {
              const securityGroups = additionalFields.securityGroups;
              for (let index = 1; index <= securityGroups.length; index++) {
                params.push(`SecurityGroups.member.${index}=${securityGroups[index - 1]}`);
              }
            }
            if (additionalFields.tagsUi) {
              const tags = additionalFields.tagsUi.tagValues;
              if (tags) {
                for (let index = 1; index <= tags.length; index++) {
                  params.push(`Tags.member.${index}.Key=${tags[index - 1].key}`);
                  params.push(`Tags.member.${index}.Value=${tags[index - 1].value}`);
                }
              }
            }
            responseData = await import_GenericFunctions.awsApiRequestSOAP.call(
              this,
              "elasticloadbalancing",
              "GET",
              "/?Action=CreateLoadBalancer&" + params.join("&")
            );
            responseData = responseData.CreateLoadBalancerResponse.CreateLoadBalancerResult.LoadBalancers.member;
          }
          if (operation === "delete") {
            const params = ["Version=2015-12-01"];
            params.push(
              "LoadBalancerArn=" + this.getNodeParameter("loadBalancerId", i)
            );
            responseData = await import_GenericFunctions.awsApiRequestSOAP.call(
              this,
              "elasticloadbalancing",
              "GET",
              "/?Action=DeleteLoadBalancer&" + params.join("&")
            );
            responseData = { success: true };
          }
          if (operation === "getMany") {
            const params = ["Version=2015-12-01"];
            const returnAll = this.getNodeParameter("returnAll", 0);
            if (returnAll) {
              const filters = this.getNodeParameter("filters", i);
              if (filters.names) {
                const names = filters.names.split(",");
                for (let index = 1; index <= names.length; index++) {
                  params.push(`Names.member.${index}=${names[index - 1]}`);
                }
              }
              responseData = await import_GenericFunctions.awsApiRequestSOAPAllItems.call(
                this,
                "DescribeLoadBalancersResponse.DescribeLoadBalancersResult.LoadBalancers.member",
                "elasticloadbalancing",
                "GET",
                "/?Action=DescribeLoadBalancers&" + params.join("&")
              );
            } else {
              params.push("PageSize=" + this.getNodeParameter("limit", 0).toString());
              responseData = await import_GenericFunctions.awsApiRequestSOAP.call(
                this,
                "elasticloadbalancing",
                "GET",
                "/?Action=DescribeLoadBalancers&" + params.join("&")
              );
              responseData = responseData.DescribeLoadBalancersResponse.DescribeLoadBalancersResult.LoadBalancers.member;
            }
          }
          if (operation === "get") {
            const params = ["Version=2015-12-01"];
            params.push(
              "LoadBalancerArns.member.1=" + this.getNodeParameter("loadBalancerId", i)
            );
            responseData = await import_GenericFunctions.awsApiRequestSOAP.call(
              this,
              "elasticloadbalancing",
              "GET",
              "/?Action=DescribeLoadBalancers&" + params.join("&")
            );
            responseData = responseData.DescribeLoadBalancersResponse.DescribeLoadBalancersResult.LoadBalancers.member;
          }
        }
        returnData.push(
          ...this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(responseData),
            {
              itemData: { item: i }
            }
          )
        );
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ error: error.toString() });
          continue;
        }
        throw error;
      }
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AwsElb
});
//# sourceMappingURL=AwsElb.node.js.map