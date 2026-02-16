package ai.novaengine.android.ui

import androidx.compose.runtime.Composable
import ai.novaengine.android.MainViewModel
import ai.novaengine.android.ui.chat.ChatSheetContent

@Composable
fun ChatSheet(viewModel: MainViewModel) {
  ChatSheetContent(viewModel = viewModel)
}
