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

import React, { useState } from 'react';

import { GuideRule, GuideRuleExample, GuideRuleTitle } from '../../components';

import {
  OuiText,
  OuiButton,
  OuiSpacer,
  OuiFlexGroup,
  OuiFlexItem,
  OuiToast,
  OuiCallOut,
  OuiModal,
  OuiModalBody,
  OuiModalFooter,
  OuiModalHeader,
  OuiModalHeaderTitle,
  OuiCodeBlock,
} from '../../../../src/components';

export default () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  let modal;

  if (isModalVisible) {
    modal = (
      <OuiModal onClose={closeModal}>
        <OuiModalHeader>
          <OuiModalHeaderTitle>
            <h1>Your visualization has an error</h1>
          </OuiModalHeaderTitle>
        </OuiModalHeader>

        <OuiModalBody>
          <OuiCallOut
            title="The maximum bucket size of 200 was exceeded"
            color="danger"
            size="s"
            iconType="alert"
          />
          <OuiSpacer size="s" />
          <OuiCodeBlock>
            {`--- FAKE ERROR ---
An extremely long error trace can exist in a modal so you have time
and space to read it properly. Alternatively just link to a full page.
---
                `}
          </OuiCodeBlock>
        </OuiModalBody>

        <OuiModalFooter>
          <OuiButton onClick={closeModal} fill>
            Close
          </OuiButton>
        </OuiModalFooter>
      </OuiModal>
    );
  }

  return (
    <>
      <OuiText grow={false}>
        <p>
          This page documents patterns for using toasts, short messages that
          appears on the lower right corner and time out after a few seconds.
          They are a popular design choice because they don&apos;t need to fit
          in a layout and don&apos;t disrupt the user.
        </p>
      </OuiText>

      <OuiSpacer size="xl" />

      <dl>
        <OuiFlexGroup alignItems="center">
          <OuiFlexItem grow={false} style={{ minWidth: 120 }}>
            <OuiToast
              style={{ width: 300 }}
              title="Your report is complete"
              color="success"
            />
          </OuiFlexItem>

          <OuiFlexItem>
            <OuiText>
              <dt>Success toasts indicate that everything worked out</dt>
              <dd>They are the most-commonly used toasts.</dd>
            </OuiText>
          </OuiFlexItem>
        </OuiFlexGroup>

        <OuiSpacer />

        <OuiFlexGroup alignItems="center">
          <OuiFlexItem grow={false} style={{ minWidth: 120 }}>
            <OuiToast
              style={{ width: 300 }}
              title="Node 726 is having trouble"
              color="warning"
            />
          </OuiFlexItem>

          <OuiFlexItem>
            <OuiText>
              <dt>
                Warning toasts direct user attention to a potential problem
              </dt>
              <dd>
                These toasts work well in monitoring apps when something
                significant requires action.
              </dd>
            </OuiText>
          </OuiFlexItem>
        </OuiFlexGroup>

        <OuiSpacer />

        <OuiFlexGroup alignItems="center">
          <OuiFlexItem grow={false} style={{ minWidth: 120 }}>
            <OuiToast
              style={{ width: 300 }}
              title="Search failed. Check your connection to the cluster."
              color="danger"
            />
          </OuiFlexItem>

          <OuiFlexItem>
            <OuiText>
              <dt>Error toasts report a problem</dt>
              <dd>
                An error toast might let users know an action didn&apos;t
                complete or that a form has errors.
              </dd>
            </OuiText>
          </OuiFlexItem>
        </OuiFlexGroup>

        <OuiSpacer />

        <OuiFlexGroup alignItems="center">
          <OuiFlexItem grow={false} style={{ minWidth: 120 }}>
            <div>
              <OuiToast
                style={{ width: 300 }}
                title="Please wait while your report is created"
                color="primary"
              />
            </div>
          </OuiFlexItem>

          <OuiFlexItem>
            <OuiText>
              <dt>Info toasts relay neutral information</dt>
              <dd>
                The default toast, an info toast might notify users about an
                ongoing action.
              </dd>
            </OuiText>
          </OuiFlexItem>
        </OuiFlexGroup>
      </dl>

      <OuiSpacer />

      <GuideRuleTitle>Use a toast for a timely message</GuideRuleTitle>

      <GuideRule
        description="Toasts are appropriate for short feedback related to a user action.
          A toast should contain a message about a current action, not a historical action.">
        <GuideRuleExample
          type="do"
          text="Use a toast for a brief message about the current action.">
          <OuiToast
            style={{ maxWidth: 300 }}
            title="Your folder was moved"
            color="success"
          />
        </GuideRuleExample>

        <GuideRuleExample
          type="dont"
          text="Greet users with a toast when they open a page.">
          <div style={{ textAlign: 'center' }}>
            <OuiToast
              style={{ maxWidth: 300 }}
              title="Haven't seen you in a while"
              color="primary"
            />
          </div>
        </GuideRuleExample>
      </GuideRule>

      <GuideRuleTitle>
        Most often, it&apos;s a single line of text
      </GuideRuleTitle>

      <GuideRule
        description="By default, a toast stays on the screen 10 seconds.
          Users should be able read the message in 6 to 7 seconds.
          The message should get straight to the point and rarely include more than one line.

          ">
        <GuideRuleExample
          type="do"
          text="A single line of text is readable at a glance.">
          <div style={{ textAlign: 'center' }}>
            <OuiToast
              style={{ maxWidth: 300 }}
              title="Check your form for errors"
              color="danger"
            />
          </div>
        </GuideRuleExample>

        <GuideRuleExample
          type="dont"
          text="Cram a lot of detail into a toast.
            These errors should persist in callouts and validations on the form.
            They don't need to be spelled out in the toast.">
          <div>
            <OuiToast
              style={{ maxWidth: 300 }}
              title="Your form has errors"
              color="danger">
              <OuiText>
                <ul>
                  <li>Username is a required field.</li>
                  <li>Password must be at least 6 characters long.</li>
                  <li>Email is a required field.</li>
                </ul>
              </OuiText>
            </OuiToast>
          </div>
        </GuideRuleExample>
      </GuideRule>

      <GuideRuleTitle>
        Toasts should only contain a single action
      </GuideRuleTitle>

      <GuideRule
        description="A toast can have a single action, styled as a standard button.
          If more actions are needed, or if the action is important enough to
          interrupt the user, use a modal instead.">
        <GuideRuleExample
          type="do"
          text="Use only one action per toast and favor a one-word label.
              Align actions to the right, which follows our button guidelines for
              usage within restricted width containers.">
          <OuiToast
            style={{ maxWidth: 300 }}
            color="success"
            title="Your report is complete">
            <div style={{ textAlign: 'right' }}>
              <OuiButton size="s">Download</OuiButton>
            </div>
          </OuiToast>
        </GuideRuleExample>

        <GuideRuleExample
          type="dont"
          text="Use multiple actions. Don't align buttons in toasts to the left.
              This message is better in a confirmation modal.">
          <OuiToast
            style={{ maxWidth: 300 }}
            title="All messages will be deleted"
            color="danger">
            <OuiFlexGroup justifyContent="flexEnd" gutterSize="s">
              <OuiFlexItem grow={false}>
                <OuiButton size="s">Cancel</OuiButton>
              </OuiFlexItem>
              <OuiFlexItem grow={false}>
                <OuiButton size="s" color="danger">
                  Delete
                </OuiButton>
              </OuiFlexItem>
            </OuiFlexGroup>
          </OuiToast>
        </GuideRuleExample>
      </GuideRule>

      <GuideRuleTitle>Icons should emphasize actions</GuideRuleTitle>

      <GuideRule description="An icon on the left of the message can help define the message type.">
        <GuideRuleExample
          type="do"
          text="The check icon reinforces that the action succeeded.
                The alert icon helps users understand the message is an error.">
          <div>
            <OuiToast
              style={{ maxWidth: 300 }}
              title="Your dashboard was updated"
              iconType="check"
              color="success"
            />

            <OuiSpacer />

            <OuiToast
              style={{ maxWidth: 300 }}
              title="A dashboard named 'MyDashboard' already exists"
              iconType="alert"
              color="danger"
            />
          </div>
        </GuideRuleExample>

        <GuideRuleExample
          type="dont"
          text="Use icons that are hard to understand. They distract from the message.">
          <OuiToast
            color="primary"
            style={{ maxWidth: 300 }}
            title="Message sent"
            iconType="help"
          />
        </GuideRuleExample>
      </GuideRule>

      <GuideRuleTitle>Display one toast at a time</GuideRuleTitle>

      <GuideRule
        description="Users should be able to take
          in all the details from one toast before the next one arrives.">
        <GuideRuleExample type="do" text="Display one toast at a time.">
          <OuiToast
            style={{ maxWidth: 300 }}
            color="primary"
            title="3 new messages"
          />
        </GuideRuleExample>

        <GuideRuleExample type="dont" text="Stack toasts.">
          <div>
            <OuiToast
              style={{ maxWidth: 300 }}
              color="danger"
              title="There was a problem with your node">
              <div style={{ textAlign: 'right' }}>
                <OuiButton size="s">Learn more</OuiButton>
              </div>
            </OuiToast>
            <OuiSpacer />

            <OuiToast
              color="primary"
              style={{ maxWidth: 300 }}
              title="3 new messages"
            />
          </div>
        </GuideRuleExample>
      </GuideRule>

      <GuideRuleTitle>Keep messages as short as possible</GuideRuleTitle>

      <GuideRule
        description="For common actions such as create, add, delete, remove, and save,
          include the object type, the object name if available, and the past tense of the action.
          ">
        <GuideRuleExample
          type="do"
          text="Include the object name if it's not too long.
            Use single quotation marks around the object name if it helps clarify meaning.">
          <div>
            <OuiToast
              color="success"
              style={{ maxWidth: 300 }}
              title="User 'Casey Smith' was added"
            />
          </div>
        </GuideRuleExample>

        <GuideRuleExample type="dont" text='Use the generic "Your object."'>
          <OuiToast
            color="success"
            style={{ maxWidth: 300 }}
            title="Your object has been saved"
          />
        </GuideRuleExample>
      </GuideRule>

      <GuideRule description="Don't include the word &quot;successfully.&quot; It's implied.">
        <GuideRuleExample
          type="do"
          text="Use this format for a success message.">
          <OuiToast
            color="success"
            style={{ maxWidth: 300 }}
            title="Dashboard 'My_dashboard_with_a_very_long_name' was saved"
          />
        </GuideRuleExample>

        <GuideRuleExample type="dont" text='Include "successfully."'>
          <OuiToast
            color="success"
            style={{ maxWidth: 300 }}
            title="Dashboard 'My_dashboard' was successfully saved"
          />
        </GuideRuleExample>
      </GuideRule>

      <GuideRule description="For a message about multiple objects, include the object count, but not the names of the objects.">
        <GuideRuleExample type="do" text="Include the object count.">
          <OuiToast
            color="success"
            style={{ maxWidth: 300 }}
            title="4 visualizations were deleted"
          />
        </GuideRuleExample>
        <GuideRuleExample
          type="dont"
          text="Overwhelm the user by listing the names of all the objects.">
          <OuiToast
            color="success"
            style={{ maxWidth: 300 }}
            title="Visualization 1, Visualization 2, Visualization 3, and Visualization 4 were deleted"
          />
        </GuideRuleExample>
      </GuideRule>

      <GuideRuleTitle>
        Use call-to-action buttons when the content needs more room
      </GuideRuleTitle>

      <GuideRule
        description="Occassionally the content of a toast is too involved to fit into the constrained space of a toast.
          This is common in long error messages. In these cases use the toast to deliver the summary of the
          information and use a button to provide a call-to-action for the full message.">
        <GuideRuleExample
          type="do"
          text="Use the toast message to provide a summary and a button to link to the full content">
          <OuiToast
            style={{ maxWidth: 300 }}
            color="danger"
            title="Your visualization has an error">
            <p>The maximum bucket size of 200 was exceeded.</p>
            <div style={{ textAlign: 'right' }}>
              <OuiButton size="s" color="danger" onClick={showModal}>
                See the full error
              </OuiButton>
              {modal}
            </div>
          </OuiToast>
        </GuideRuleExample>

        <GuideRuleExample
          type="dont"
          text="Cram a lot of content into the small space of a toast.">
          <OuiToast
            style={{ maxWidth: 300 }}
            color="danger"
            title="Your visualization has an error">
            <OuiCallOut
              title="The maximum bucket size of 200 was exceeded"
              color="danger">
              <p>An extremely long error trace.</p>
            </OuiCallOut>
          </OuiToast>
        </GuideRuleExample>
      </GuideRule>
    </>
  );
};
