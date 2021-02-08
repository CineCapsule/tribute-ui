import {
  SnapshotDraftData,
  SnapshotProposalData,
  SnapshotDraftResponseData,
  SnapshotProposalResponseData,
  SnapshotType,
} from '@openlaw/snapshot-js-erc712';

/**
 * ENUMS
 */

// @todo Need more information about the vote challenge flow.
export enum ProposalFlowStatus {
  Sponsor = 'Sponsor',
  OffchainVoting = 'OffchainVoting',
  OffchainVotingSubmitResult = 'OffchainVotingSubmitResult',
  OffchainVotingGracePeriod = 'OffchainVotingGracePeriod',
  OnchainVoting = 'OnchainVoting',
  Process = 'Process',
  Completed = 'Completed',
}

/**
 * TYPES
 */

// @todo Change the type to be precise
export type SubgraphProposal = Record<string, any>;

/**
 * We augment the response data to add a few helpful data pieces.
 */
export type SnapshotDraft = {
  /**
   * The ID used to reference the DAO.
   */
  idInDAO: string;
  /**
   * An ID helper to reference the Draft hash
   */
  idInSnapshot: string;
} & SnapshotDraftResponseData;

/**
 * We augment the response data to add a few helpful data pieces.
 */
export type SnapshotProposal = {
  /**
   * The ID used to reference the DAO.
   */
  idInDAO: string;
  /**
   * An ID helper to reference the Proposal hash
   */
  idInSnapshot: string;
} & SnapshotProposalResponseData;

/**
 * Common data shared between a Snapshot Drafts and Proposals.
 * Helpful when we need to display information which is accessible on both.
 */
export type SnapshotProposalCommon = SnapshotDraft | SnapshotProposal;

export type ProposalData = {
  daoProposal: SubgraphProposal | undefined;
  /**
   * Data for either a Draft or Proposal which is shared between the two types.
   */
  getCommonSnapshotProposalData: () => SnapshotProposalCommon | undefined;
  refetchProposalOrDraft: () => void;
  snapshotDraft: SnapshotDraft | undefined;
  snapshotProposal: SnapshotProposal | undefined;
  snapshotType: ProposalOrDraftSnapshotType | undefined;
};

/**
 * A conditional helper type for determining which data shape to use.
 *
 * @link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html
 */
export type ProposalOrDraftSnapshotData =
  | SnapshotDraftResponseData
  | SnapshotProposalResponseData;

export type ProposalOrDraftSnapshotType =
  | SnapshotType.proposal
  | SnapshotType.draft;

/**
 * A conditional helper type for determining which data shape to use based on the `ProposalOrDraftSnapshotType`.
 *
 * @link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html
 */
export type ProposalOrDraftSignDataFromType<
  T extends ProposalOrDraftSnapshotType
> = T extends SnapshotType.proposal ? SnapshotProposalData : SnapshotDraftData;
