package ai.nova-engine.android.ui

import androidx.compose.runtime.Composable
import ai.nova-engine.android.MainViewModel
import ai.nova-engine.android.ui.chat.ChatSheetContent

@Composable
fun ChatSheet(viewModel: MainViewModel) {
  ChatSheetContent(viewModel = viewModel)
}
