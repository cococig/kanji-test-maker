import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { Subscription } from "rxjs";
import { MessageService } from "src/app/services/message.service";

@Component({
	selector: "app-toast",
	standalone: true,
	imports: [CommonModule],
	templateUrl: "./toast.component.html",
	styleUrl: "./toast.component.scss",
})
export class ToastComponent implements OnInit, OnDestroy {
	visible = false;
	message?: Message | null;
	private subscription?: Subscription;
	private messageService = inject(MessageService);

	ngOnInit(): void {
		this.subscription = this.messageService.getMessage().subscribe((data) => {
			this.message = data;
			this.visible = true;
			setTimeout(() => {
				this.visible = false;
				setTimeout(() => {
					this.message = null;
				}, 300);
			}, data.duration);
		});
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
}
