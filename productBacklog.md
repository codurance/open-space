# OpenSpace Product Backlog

#### User Registered - email registration

As an Attendee I wash to register for the Open space so that I can vote for and attend sessions, and receive notifications

- Allow an Attendee to register with email address and password
- Take users name and email address

#### User edited

As an Attendee I wish update my details in case I have made a mistake when entering them.

- Allow user to change name.
- Allow user to change email address.
- Allow user to change password.

#### Space Updated

As an Administrator I will be able to modify existing spaces for a venue.

- List current spaces in a venue
- Edit space name
- Edit space description
- Edit space facilities
- Edit space capacity

#### Space Removed

As an Administrator I will be able to remove a space from a venue so that sessions can no longer be held in them.

- List current spaces in a venue
- show a remove button
- Add confirmation before a space is removed

#### Session Provided Requirements

As a Presenter, I will need to specify any special room facilities I need to complete my session.

- Allow the presenter to request facilities available
- List all facilities available in a Venue
- If needed, update the schedule with any room changes

#### Space Capacity Set

As an Administrator, I would like to specify the maximum capacity for a space so that it is easier to match a session with a space.

- Add a maximum occupancy for a space

#### Session Removed Due To Not Enough Votes

As a System, if there are too many sessions for the space available then the lowest voted for sessions will not be scheduled.

- Lowest voted for sessions will not be scheduled
- If a scheduled session is canceled then reschedule to bring in previously excluded sessions

#### Session Viewed

As an Attendee I wish to be able to view the details of a session so I can decide if it is something I would like to attend.

- List all sessions
- when a session is selected display the session name and details

#### Venue Removed

As an Administrator, I wish to be able to remove a venue that is no longer in use so that I can prevent future events being scheduled there

- List all venues
- Show a delete button next to each venue with no scheduled open spaces
- When the delete button is pressed a confirmation should be displayed before deleting

#### Presenter Created

As a system, when an Attendee creates a session and they have not done so already a Presenter will be created so that the session can be subsequently edited

- Check if Attendee is already a presenter
- If not, change Attendee to Presenter

* The Attendees are only a Presenter in the sessions they create.

## Session Scheduled

#### User Logged In

As an Attendee, Presenter or Event Organiser, I want to log in so that I can see and modify my schedule

- Display a login page
- Allow users to log in with their google account
- Allow users to log in with their email and password
- Display a message if credentials are incorrect

## Participants for whole open space decided

#### Feedback Requested

As a Presenter, I want to request feedback for my session from it’s attendees so that I can improve my session next time

- Display a “request feedback” button once session is over
- Contact all Attendees with a feedback link

#### Feedback Receieved

As an Attendee, I want to be able to give feedback on a session that I have attended

- Give feedback via an emailed link or..
- Give feedback as a direct link from the Session’s page once it had finished
- Give the session a 1-5 rating
- Allow additional feedback via a free text box

#### Photo uploaded

As an Attendee or Presenter, I want to upload photographs of a session I attended to show others.

- Allow session attendees to upload photographs

## User Given a Role (Organiser, Presenter, Attendee)

####Session Given a Timeslot
As a System, a session must be given a time slot so that a schedule can be produced.

- Only one Session can happen at a time per space
- System should produce a proposed schedule
- Event Organisers gan manually edit times
- Sessions will not be automatically scheduled over break times
- Manual time entry will allow sessions over breaks

#### Session relocated

As an Event Organiser, I can move a session to another space so that I can manually alter the event schedule.

- Sessions can only be moved into free slots in a space’s schedule
- Attendees and presented should be notified of the move once it is confirmed

## Session Finished

#### Session Feedback Submitted

As an Attendee, i want to give feedback to sessions I attend.

- Can only give feedback if you attended the session
- Can only give feedback once the session has finished
- Feedback submitted via the session page once it has finished

## Session Capacity Reached

#### Post Event Feedback Requested

As an Event Organiser, I want to request feedback for an open space from it’s attendees

- Display a “request feedback” button once all sessions are over
- Contact all Attendees with a feedback link

#### Post Event Feedback Receievd

As an Attendee, I want to be able to give feedback on an open space that I have attended

- Give feedback via an emailed link or..
- Give feedback as a direct link from the Open Space page once it had finished
- Give the open space a 1-5 rating
- Allow additional feedback via a free text box

#### Open Space Finished

As a system, once all sessions have finished for an open space, allow the ability for Attendees to give feedback on the open space.

- One Attendees to the open space can give feedback
- Add a feedback button to the open space page.

## Session Archived

## Session Archive Viewed

#### Sessions prioritized by number of people subscribed

As a System, when scheduling sessions, give priority to the highest voted for sessions.

- Highest votes sessions are to happen first
- If more than one space is available try not to schedule multiple popular sessions at the same time

#### Session Material Added

As a Presenter, I would like to be able to upload learning material for my session so that Attendees can view it at a later date.

- List my sessions.
- Upload material from a session.
- Give Material a name

#### Space allocation waitlisted because of people overflow

As a System, when scheduling an open space, if there are more Attendees want to go to a session than the available space allows, assign the first people who voted for it to the session and add the remaining Attendees to a waiting list.

- Only add the number of Attendees up to the maximum of the space capacity

#### User Removed

As an Attendee, I would like the ability to remove my account from the system.

- Display a confirmation before removing the account.
- Remove any votes against active sessions made by the Attendee
