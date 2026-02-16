import type { Nova EngineConfig } from "../../config/config.js";
import type { DmPolicy } from "../../config/types.js";
import type { RuntimeEnv } from "../../runtime.js";
import type { WizardPrompter } from "../../wizard/prompts.js";
import type { ChannelId } from "./types.js";

export type SetupChannelsOptions = {
  allowDisable?: boolean;
  allowSignalInstall?: boolean;
  onSelection?: (selection: ChannelId[]) => void;
  accountIds?: Partial<Record<ChannelId, string>>;
  onAccountId?: (channel: ChannelId, accountId: string) => void;
  promptAccountIds?: boolean;
  whatsappAccountId?: string;
  promptWhatsAppAccountId?: boolean;
  onWhatsAppAccountId?: (accountId: string) => void;
  forceAllowFromChannels?: ChannelId[];
  skipStatusNote?: boolean;
  skipDmPolicyPrompt?: boolean;
  skipConfirm?: boolean;
  quickstartDefaults?: boolean;
  initialSelection?: ChannelId[];
};

export type PromptAccountIdParams = {
  cfg: Nova EngineConfig;
  prompter: WizardPrompter;
  label: string;
  currentId?: string;
  listAccountIds: (cfg: Nova EngineConfig) => string[];
  defaultAccountId: string;
};

export type PromptAccountId = (params: PromptAccountIdParams) => Promise<string>;

export type ChannelOnboardingStatus = {
  channel: ChannelId;
  configured: boolean;
  statusLines: string[];
  selectionHint?: string;
  quickstartScore?: number;
};

export type ChannelOnboardingStatusContext = {
  cfg: Nova EngineConfig;
  options?: SetupChannelsOptions;
  accountOverrides: Partial<Record<ChannelId, string>>;
};

export type ChannelOnboardingConfigureContext = {
  cfg: Nova EngineConfig;
  runtime: RuntimeEnv;
  prompter: WizardPrompter;
  options?: SetupChannelsOptions;
  accountOverrides: Partial<Record<ChannelId, string>>;
  shouldPromptAccountIds: boolean;
  forceAllowFrom: boolean;
};

export type ChannelOnboardingResult = {
  cfg: Nova EngineConfig;
  accountId?: string;
};

export type ChannelOnboardingDmPolicy = {
  label: string;
  channel: ChannelId;
  policyKey: string;
  allowFromKey: string;
  getCurrent: (cfg: Nova EngineConfig) => DmPolicy;
  setPolicy: (cfg: Nova EngineConfig, policy: DmPolicy) => Nova EngineConfig;
  promptAllowFrom?: (params: {
    cfg: Nova EngineConfig;
    prompter: WizardPrompter;
    accountId?: string;
  }) => Promise<Nova EngineConfig>;
};

export type ChannelOnboardingAdapter = {
  channel: ChannelId;
  getStatus: (ctx: ChannelOnboardingStatusContext) => Promise<ChannelOnboardingStatus>;
  configure: (ctx: ChannelOnboardingConfigureContext) => Promise<ChannelOnboardingResult>;
  dmPolicy?: ChannelOnboardingDmPolicy;
  onAccountRecorded?: (accountId: string, options?: SetupChannelsOptions) => void;
  disable?: (cfg: Nova EngineConfig) => Nova EngineConfig;
};
