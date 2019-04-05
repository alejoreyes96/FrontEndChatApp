import { TestBed } from '@angular/core/testing';

import { GroupChatService } from './group-chat.service';

describe('GroupChatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GroupChatService = TestBed.get(GroupChatService);
    expect(service).toBeTruthy();
  });
});
