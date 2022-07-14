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

import { GuideRule, GuideRuleExample, GuideRuleTitle } from '../../components';

import {
  OuiButton,
  OuiText,
  OuiTitle,
  OuiSpacer,
  OuiFlexGroup,
  OuiFlexItem,
  OuiPanel,
  OuiModalBody,
  OuiModalFooter,
  OuiModalHeader,
  OuiModalHeaderTitle,
  OuiButtonEmpty,
  OuiFormRow,
  OuiFieldText,
  OuiTextArea,
  OuiCard,
  OuiHorizontalRule,
} from '../../../../src/components';

export default () => (
  <>
    <OuiText grow={false}>
      <p>A modal says “pay attention to me and nothing else.”</p>
    </OuiText>

    <OuiSpacer size="xxl" />

    <OuiPanel
      color="subdued"
      paddingSize="l"
      hasShadow={false}
      style={{ justifyContent: 'center', display: 'flex' }}>
      <OuiPanel style={{ maxWidth: 520 }} paddingSize="none">
        <OuiModalHeader>
          <OuiModalHeaderTitle>
            A modal title should be one line
          </OuiModalHeaderTitle>
        </OuiModalHeader>
        <OuiModalBody>
          <OuiText>
            <p>
              The modal body will automatically scroll if the content gets too
              tall. Try to keep this from happening by keeping your content
              short and to the point.
            </p>
          </OuiText>
        </OuiModalBody>

        <OuiModalFooter>
          <OuiButtonEmpty>Secondary action</OuiButtonEmpty>

          <OuiButton fill>Primary action</OuiButton>
        </OuiModalFooter>
      </OuiPanel>
    </OuiPanel>

    <OuiSpacer size="xxl" />

    <OuiFlexGroup wrap={true}>
      <OuiFlexItem>
        <OuiCard
          titleSize="xs"
          layout="horizontal"
          display="plain"
          title="The header sets the context"
          description="Short and sentence-case, the header should indicate what the modal is about."
        />
      </OuiFlexItem>
      <OuiFlexItem>
        <OuiCard
          titleSize="xs"
          layout="horizontal"
          display="plain"
          title="The body is for a single task"
          description="This task should not require a lot of explanation or user interaction."
        />
      </OuiFlexItem>
      <OuiFlexItem>
        <OuiCard
          titleSize="xs"
          layout="horizontal"
          display="plain"
          title="Buttons are right-aligned"
          description="The primary action is a filled button, and the secondary action is a link button. Labels should use strong action verbs."
        />
      </OuiFlexItem>
    </OuiFlexGroup>

    <OuiSpacer size="xl" />

    <GuideRuleTitle>Use a modal to silo a single action</GuideRuleTitle>

    <GuideRule
      heading=""
      description="A modal can gather input necessary for continuing the current workflow.
      This type of modal works best for a short, focused task.
      Use input modals sparingly&mdash;they interrupt the user's workflow.
      ">
      <GuideRuleExample
        type="do"
        text="A save action is a good use case for a modal. The
        meaning is clear and the content is simple.">
        <OuiPanel
          paddingSize="none"
          style={{ maxWidth: 400, transform: 'scale(.75)' }}>
          <OuiModalHeader>
            <OuiModalHeaderTitle>Save dashboard</OuiModalHeaderTitle>
          </OuiModalHeader>
          <OuiModalBody>
            <OuiFormRow label="Name">
              <OuiFieldText />
            </OuiFormRow>
            <OuiFormRow label="Description">
              <OuiTextArea />
            </OuiFormRow>
          </OuiModalBody>

          <OuiModalFooter>
            <OuiButtonEmpty>Cancel</OuiButtonEmpty>

            <OuiButton fill>Save</OuiButton>
          </OuiModalFooter>
        </OuiPanel>
      </GuideRuleExample>

      <GuideRuleExample
        type="dont"
        text="Modals aren't the best design solution for multiple steps or complex user input.
        An in-page form is more appropriate.">
        <OuiPanel
          paddingSize="none"
          style={{ maxWidth: 400, transform: 'scale(.75)' }}>
          <OuiModalHeader>
            <OuiModalHeaderTitle>Add a team member</OuiModalHeaderTitle>
          </OuiModalHeader>
          <OuiModalBody>
            <OuiTitle size="s">
              <h3>Step 1 of 3: the basics</h3>
            </OuiTitle>
            <OuiSpacer />
            <OuiFormRow label="Name">
              <OuiFieldText />
            </OuiFormRow>
            <OuiFormRow label="Email">
              <OuiFieldText />
            </OuiFormRow>
          </OuiModalBody>

          <OuiModalFooter>
            <OuiButtonEmpty>Cancel</OuiButtonEmpty>

            <OuiButton fill>Continue to step 2</OuiButton>
          </OuiModalFooter>
        </OuiPanel>
      </GuideRuleExample>
    </GuideRule>

    <OuiSpacer size="xl" />

    <OuiHorizontalRule margin="xl" />

    <OuiFlexGroup wrap={true}>
      <OuiFlexItem>
        <OuiCard
          titleSize="xs"
          layout="horizontal"
          display="plain"
          title="Open a modal on a user action"
          description="Let a user action, such as a button click,
          open a modal. Don't open a modal from a toolbar action&mdash;users don't expect it."
        />
      </OuiFlexItem>
      <OuiFlexItem>
        <OuiCard
          titleSize="xs"
          layout="horizontal"
          display="plain"
          title="Avoid scrolling content"
          description="Modal content should fit in a single view. If your modal has
          a lot of detail or a long list of items, consider a different solution, such as a
          form or a table."
        />
      </OuiFlexItem>
      <OuiFlexItem>
        <OuiCard
          titleSize="xs"
          layout="horizontal"
          display="plain"
          title="Don't stack modals"
          description="Opening a modal on top of a modal might mean your workflow is too complex.
          Instead, use a component that supports multiple steps, such as a form or steps."
        />
      </OuiFlexItem>
    </OuiFlexGroup>

    <GuideRuleTitle>
      Use a modal to ask users to confirm an action
    </GuideRuleTitle>

    <GuideRule
      heading=""
      description="The most common use of modals in the OUI Framework is
      to confirm a user action.
      This modal should start with a question, give
      users enough information to make a decision,
      and restate the action in the button label.">
      <GuideRuleExample
        type="do"
        text="Use a modal for confirmation when the user might lose data. For the body
        text, use one to two short sentences that explain the consequences.">
        <OuiPanel
          paddingSize="none"
          style={{ maxWidth: 400, transform: 'scale(.75)' }}>
          <OuiModalHeader>
            <OuiModalHeaderTitle>
              Save changes before leaving?
            </OuiModalHeaderTitle>
          </OuiModalHeader>
          <OuiModalBody>
            <OuiText>
              <p>If you don&apos;t save, your changes will be lost.</p>
            </OuiText>
          </OuiModalBody>

          <OuiModalFooter>
            <OuiButtonEmpty>Leave anyway</OuiButtonEmpty>

            <OuiButton fill>Save changes</OuiButton>
          </OuiModalFooter>
        </OuiPanel>
      </GuideRuleExample>

      <GuideRuleExample
        type="dont"
        text=" Confirmations aren't good for messages.
          Toasts are best for success messages because they are less disruptive.
          Error and warning messages often appear directly on the page.">
        <OuiPanel
          paddingSize="none"
          style={{ maxWidth: 400, transform: 'scale(.75)' }}>
          <OuiModalHeader>
            <OuiModalHeaderTitle>Great!</OuiModalHeaderTitle>
          </OuiModalHeader>
          <OuiModalBody>
            <OuiText>
              <p>Your dashboard has been successfully created.</p>
            </OuiText>
          </OuiModalBody>

          <OuiModalFooter>
            <OuiButton fill>Close</OuiButton>
          </OuiModalFooter>
        </OuiPanel>
      </GuideRuleExample>
    </GuideRule>

    <GuideRule
      heading="State the action in both the header and button text"
      description='If the modal header is "Refresh this field?" then the button text should be "Refresh."'>
      <GuideRuleExample
        type="do"
        text="Use the same action verbs in the header and button text.">
        <OuiPanel
          paddingSize="none"
          style={{ maxWidth: 400, transform: 'scale(.75)' }}>
          <OuiModalHeader>
            <OuiModalHeaderTitle>Refresh field list?</OuiModalHeaderTitle>
          </OuiModalHeader>
          <OuiModalBody>
            <OuiText>
              <p>This action resets the popularity counter of each field.</p>
            </OuiText>
          </OuiModalBody>

          <OuiModalFooter>
            <OuiButtonEmpty>Cancel</OuiButtonEmpty>

            <OuiButton fill>Refresh</OuiButton>
          </OuiModalFooter>
        </OuiPanel>
      </GuideRuleExample>

      <GuideRuleExample
        type="dont"
        text='Don&apos;t use a vague header such as "Are you sure?" or the button labels "Yes" and "No."'>
        <OuiPanel
          paddingSize="none"
          style={{ maxWidth: 400, transform: 'scale(.75)' }}>
          <OuiModalHeader>
            <OuiModalHeaderTitle>
              Are you sure you want to refresh this field list?
            </OuiModalHeaderTitle>
          </OuiModalHeader>
          <OuiModalBody>
            <OuiText>
              <p>This action resets the popularity counter of each field.</p>
            </OuiText>
          </OuiModalBody>

          <OuiModalFooter>
            <OuiButtonEmpty>No</OuiButtonEmpty>

            <OuiButton fill>Yes</OuiButton>
          </OuiModalFooter>
        </OuiPanel>
      </GuideRuleExample>
    </GuideRule>

    <GuideRule
      heading="Create separate confirmations for single and bulk actions"
      description={
        'It avoids the awkwardness of "Delete 1 pipeline(s)" and improves readability.\''
      }>
      <GuideRuleExample
        type="do"
        text="Asking users to delete a single item should include the item name in the title, if possible.
        Use single quotes around the name if it helps clarify meaning.">
        <OuiPanel
          paddingSize="none"
          style={{ maxWidth: 400, transform: 'scale(.75)' }}>
          <OuiModalHeader>
            <OuiModalHeaderTitle>
              Delete pipeline &apos;MyPipeline&apos;?
            </OuiModalHeaderTitle>
          </OuiModalHeader>
          <OuiModalBody>
            <OuiText>
              <p>You can&apos;t recover deleted data.</p>
            </OuiText>
          </OuiModalBody>

          <OuiModalFooter>
            <OuiButtonEmpty>Cancel</OuiButtonEmpty>

            <OuiButton color="danger" fill>
              Delete
            </OuiButton>
          </OuiModalFooter>
        </OuiPanel>
      </GuideRuleExample>

      <GuideRuleExample
        type="do"
        text="For bulk actions, include the number of items in the title.">
        <OuiPanel
          paddingSize="none"
          style={{ maxWidth: 400, transform: 'scale(.75)' }}>
          <OuiModalHeader>
            <OuiModalHeaderTitle>Delete 6 pipelines?</OuiModalHeaderTitle>
          </OuiModalHeader>
          <OuiModalBody>
            <OuiText>
              <p>You can&apos;t recover deleted data.</p>
            </OuiText>
          </OuiModalBody>

          <OuiModalFooter>
            <OuiButtonEmpty>Cancel</OuiButtonEmpty>

            <OuiButton color="danger" fill>
              Delete
            </OuiButton>
          </OuiModalFooter>
        </OuiPanel>
      </GuideRuleExample>
    </GuideRule>

    <GuideRule
      heading="Sometimes a header and buttons are enough"
      description="You can omit the body if users understand the decision from the header and button text alone.">
      <GuideRuleExample
        type="do"
        text="Here the header and body are enough.
        The modal asks the user whether to remove an index pattern &mdash; data won't be lost.">
        <OuiPanel
          paddingSize="none"
          style={{ maxWidth: 400, transform: 'scale(.75)' }}>
          <OuiModalHeader>
            <OuiModalHeaderTitle>Remove index pattern?</OuiModalHeaderTitle>
          </OuiModalHeader>

          <OuiModalFooter>
            <OuiButtonEmpty>Cancel</OuiButtonEmpty>

            <OuiButton fill color="danger">
              Remove
            </OuiButton>
          </OuiModalFooter>
        </OuiPanel>
      </GuideRuleExample>

      <GuideRuleExample
        type="dont"
        text="Don't write body text that simply repeats the title. It doesn't add value.">
        <OuiPanel
          paddingSize="none"
          style={{ maxWidth: 400, transform: 'scale(.75)' }}>
          <OuiModalHeader>
            <OuiModalHeaderTitle>Remove index pattern?</OuiModalHeaderTitle>
          </OuiModalHeader>
          <OuiModalBody>
            <OuiText>
              <p>This action removes your index pattern.</p>
            </OuiText>
          </OuiModalBody>

          <OuiModalFooter>
            <OuiButtonEmpty>Cancel</OuiButtonEmpty>

            <OuiButton color="danger" fill>
              Remove
            </OuiButton>
          </OuiModalFooter>
        </OuiPanel>
      </GuideRuleExample>
    </GuideRule>
  </>
);
