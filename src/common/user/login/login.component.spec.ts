



describe('.login()', () => {
		it('should', () => {
			expect(true).toBe(true);
		});
/*
		it('should log user in if code is 200', inject([MockBackend], mockBackend => {

			const mockResponse = {
				user: otherUser,
				token: otherToken,
			};

			mockBackend.connections.subscribe((connection) => {
				connection.mockRespond(new Response(new ResponseOptions({
					body: JSON.stringify(mockResponse),
				})));
			});

			service.login({}).subscribe(() => {
				expect(service.user).toBe(otherUser);
				expect(service.token).toBe(otherToken);
			});

		}));

		it('should not login user in if there is an error', inject([MockBackend], mockBackend => {

			mockBackend.connections.subscribe((connection) => {
				connection.mockError();
			});	

			service.logout();

			service.login({}).subscribe(() => {
				expect(false).toBe(true);
				
			}, () => {
				expect(service.user).toBe(null);
				expect(service.token).toBe(null);
			});
*/


});
