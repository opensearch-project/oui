/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

import React from 'react';
import { Link } from 'react-router-dom';

import { GuideSectionTypes } from '../../components';

import {
  OuiCode,
  OuiModal,
  OuiModalHeader,
  OuiModalHeaderTitle,
  OuiModalBody,
  OuiModalFooter,
  OuiConfirmModal,
  OuiText,
} from '../../../../src/components';
import Guidelines from './guidelines';

import Modal from './modal';
const modalSource = require('./modal?raw');

import ModalForm from './modal_form';
const modalFormSource = require('./modal_form?raw');

import ConfirmModal from './confirm_modal';
const confirmModalSource = require('./confirm_modal?raw');

import ConfirmLoadingModal from './confirm_modal_loading';
const confirmModalLoadingSource = require('./confirm_modal_loading?raw');

import ModalWidth from './modal_width';
const modalWidthSource = require('./modal_width?raw');

const modalSnippet = `<OuiModal onClose={closeModal}>
  <OuiModalHeader>
    <OuiModalHeaderTitle><h1><!-- Modal title --></h1></OuiModalHeaderTitle>
  </OuiModalHeader>

  <OuiModalBody>
    <!-- Modal body -->
  </OuiModalBody>

  <OuiModalFooter>
    <OuiButton onClick={closeModal} fill>Close</OuiButton>
  </OuiModalFooter>
</OuiModal>`;

const modalWidthSnippet = `<OuiModal style={{ width: 800 }} onClose={closeModal}>
  <OuiModalHeader>
    <OuiModalHeaderTitle><h1><!-- Modal title --></h1></OuiModalHeaderTitle>
  </OuiModalHeader>

  <OuiModalBody>
    <!-- Modal body -->
  </OuiModalBody>

  <OuiModalFooter>
    <OuiButton onClick={closeModal} fill>Close</OuiButton>
  </OuiModalFooter>
</OuiModal>`;

const modalFormSnippet = `<OuiModal onClose={closeModal}>
  <OuiModalHeader>
    <OuiModalHeaderTitle><h1><!-- Modal title --></h1></OuiModalHeaderTitle>
  </OuiModalHeader>

  <OuiModalBody>
    <OuiForm id={formId} component="form"><!-- Modal body --></OuiForm>
  </OuiModalBody>

  <OuiModalFooter>
    <OuiButtonEmpty onClick={closeModal}>Cancel</OuiButtonEmpty>
    <OuiButton type="submit" form={formId} fill>Save</OuiButton>
  </OuiModalFooter>
</OuiModal>`;

const confirmModalSnippet = [
  `<OuiConfirmModal
  title={title}
  onCancel={closeModal}
  onConfirm={closeModal}
  cancelButtonText={cancelText}
  confirmButtonText={confirmText}>
  <!-- ConfirmModal content -->
</OuiConfirmModal>`,
  `<OuiConfirmModal
  title={title}
  onCancel={closeDestroyModal}
  onConfirm={closeDestroyModal}
  cancelButtonText={cancelText}
  confirmButtonText={confirmText}
  buttonColor="danger">
  <!-- Dangerous ConfirmModal content -->
</OuiConfirmModal>`,
];

const confirmModalLoadingSnippet = [
  `<OuiConfirmModal
  title={title}
  onCancel={closeModal}
  onConfirm={closeModal}
  cancelButtonText={cancelText}
  confirmButtonText={confirmText}
  confirmButtonDisabled
  isLoading>
  <!-- ConfirmModal content -->
</OuiConfirmModal>`,
];

export const ModalExample = {
  title: 'Modal',
  guidelines: <Guidelines />,
  intro: (
    <OuiText>
      <p>
        A modal works best for focusing users&apos; attention on a{' '}
        <strong>short</strong> amount of content and getting them to make a
        decision. Use it to temporarily interrupt a user’s current task and
        block interactions to the content below it.
      </p>
      <p>
        If your modal content is more complex, or requires considerable time to
        complete, consider using an{' '}
        <Link to="/layout/flyout">
          <strong>OuiFlyout</strong>
        </Link>{' '}
        instead.
      </p>
    </OuiText>
  ),
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: modalSource,
        },
      ],
      text: (
        <>
          <p>
            Each <strong>OuiModal</strong> requires a specific set of nested
            child components. They can be omitted if necessary, but the order
            cannot be changed or interrupted.
          </p>
          <p>
            Modals come a wrapping <strong>OuiOverlayMask</strong> to obscure
            the content beneath, but unlike{' '}
            <Link to="/layout/flyout">flyouts</Link>, modals cannot be dismissed
            by clicking on the overlay mask. This is inline with our{' '}
            <Link to="/layout/modal/guidelines">modal usage guidelines</Link>{' '}
            which requires there to be a primary action button, even if that
            button simply closes the modal.
          </p>
        </>
      ),
      props: {
        OuiModal,
        OuiModalHeader,
        OuiModalHeaderTitle,
        OuiModalBody,
        OuiModalFooter,
      },
      snippet: modalSnippet,
      demo: <Modal />,
    },
    {
      title: 'Forms in a modal',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: modalFormSource,
        },
      ],
      text: (
        <>
          <p>
            Since the child components of <strong>OuiModal</strong> are required
            to be in a specific order, you can only wrap the contents within{' '}
            <strong>OuiModalBody</strong> with the{' '}
            <OuiCode>{'<form />'}</OuiCode> element. You can then hook up your
            submit button inside <strong>OuiModalFooter</strong> by adding the{' '}
            <OuiCode>id</OuiCode> of the <OuiCode>{'<form />'}</OuiCode> element
            to the <OuiCode>form</OuiCode> prop of the button.
          </p>
        </>
      ),
      props: { OuiModal },
      snippet: modalFormSnippet,
      demo: <ModalForm />,
    },
    {
      title: 'Confirm modal',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: confirmModalSource,
        },
      ],
      text: (
        <p>
          Use the <strong>OuiConfirmModal</strong> to ask the user to confirm a
          decision. It is a contextual wrapper around <strong>OuiModal</strong>{' '}
          that provides some helpful props for filling in common modal pieces.
          By default, the button color indicates a positive or neutral action.
          Change the <OuiCode>buttonColor</OuiCode> property to{' '}
          <OuiCode>danger</OuiCode> to indicate a destructive action.
        </p>
      ),
      props: { OuiConfirmModal },
      snippet: confirmModalSnippet,
      demo: <ConfirmModal />,
    },
    {
      title: 'Loading and disabling confirm button',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: confirmModalLoadingSource,
        },
      ],
      text: (
        <p>
          <strong>OuiConfirmModal</strong> supports being able to apply loading
          and disabled states to the confirm button with the{' '}
          <OuiCode>confirmButtonDisabled</OuiCode> and{' '}
          <OuiCode>isLoading</OuiCode> props respectively. This is helpful to
          indicate the fetching of data and/or to wait for a user&apos;s input
          before enabling the confirm action.
        </p>
      ),
      props: { OuiConfirmModal },
      snippet: confirmModalLoadingSnippet,
      demo: <ConfirmLoadingModal />,
    },
    {
      title: 'Widths',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: modalWidthSource,
        },
      ],
      text: (
        <>
          <p>
            Modals start with a minimum width of <OuiCode>400px</OuiCode>, just
            enough to display form rows. They will grow to fit the contents
            until it reaches the specified <OuiCode>maxWidth</OuiCode>, the
            default of which is set to the medium breakpoint.
          </p>
          <p>
            If the modal is not growing wide enough to fit your contents, you
            can pass a specific <OuiCode>style.width</OuiCode>, just remember
            that modals will always shrink to fit the window width.
          </p>
        </>
      ),
      props: { OuiModal },
      snippet: modalWidthSnippet,
      demo: <ModalWidth />,
    },
  ],
};
