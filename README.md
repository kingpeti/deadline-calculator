# Task

## Deadline calculator

This exercise aims to assess your algorithmic skills and ability to write production code. The task involves creating a deadline calculator program that determines the resolution date and time for reported problems (bugs) based on specific rules:

Working hours are from 9 AM to 5 PM, Monday through Friday.

The program doesn't account for holidays; a holiday on a Thursday is still considered a working day, and a working Saturday is considered a nonworking day.

Turnaround time is given in working hours. For instance, 2 days are equivalent to 16 working hours.

Problems can only be reported during working hours (9 AM to 5 PM).

Your main task is to implement the calculateDeadline method, which takes the submit date and turnaround time as input and returns the date and time when the issue should be resolved.

Usage of third-party date-time libraries like moment.js or date-fns not allowed.

### Additional Information:

Creating automated tests for your solution is beneficial but not mandatory. Test-driven development (TDD) solutions are appreciated.

Writing clean code, as defined by Robert C. Martin, is encouraged.

Using GIT is appreciated.

Please integrate the implementation either within a user interface (UI) or behind an API endpoint.
